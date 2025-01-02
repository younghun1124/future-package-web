// src/utils/uploadImage.js
import bucket from './gcpStorage';

/**
 * GCS에 파일 업로드
 * @param {Object} file - { originalFilename, mimetype, buffer }
 * @param {String} folder - 업로드될 경로명 (예: 'uploads', 'mirrors' 등)
 * @returns {Promise<String>} 업로드된 파일 경로 (ex: 'uploads/167xxxx-parcel.svg')
 */
export async function uploadToGCS(file, folder) {
  if (!bucket) {
    throw new Error('GCP 버킷이 초기화되지 않았습니다.');
  }

  const timestamp = Date.now();
  const fileName = `${folder}/${timestamp}-${file.originalFilename || file.name}`;
  const contentType = file.mimetype || file.type;
  const blob = bucket.file(fileName);

  console.log('업로드 시작:', fileName);
  console.log('Content-Type:', contentType);

  return new Promise((resolve, reject) => {
    const blobStream = blob.createWriteStream({
      resumable: false,
      metadata: {
        contentType
      },
      // bucket의 ACL이 private이기 때문에
      // 굳이 여기서 public: true와 같은 설정은 하지 않습니다.
    });

    blobStream.on('error', (error) => {
      console.error('스트림 오류:', error);
      reject(error);
    });

    blobStream.on('finish', async () => {
      try {
        const signedUrl = await getSignedUrlFromGCS(fileName);
        resolve({
          filePath: fileName,
          signedUrl
        });
      } catch (error) {
        console.error('파일 업로드 오류:', error);
        reject(error);
      }
    });

    if (!file.buffer) {
      reject(new Error('파일 버퍼가 없습니다.'));
      return;
    }

    blobStream.end(file.buffer);
  });
}

/**
 * private 버킷에 있는 객체의 Signed URL 발급
 * @param {String} filePath - GCS 상의 파일 경로 (ex: 'uploads/167xxxx-parcel.svg')
 * @param {Number} expiresInSeconds - 몇 초 동안 유효한 URL인지 (기본 3600초 = 1시간)
 * @returns {Promise<String>} Signed URL
 */
export async function getSignedUrlFromGCS(filePath) {
  if (!bucket) {
    throw new Error('GCP 버킷이 초기화되지 않았습니다.');
  }

  const file = bucket.file(filePath);
  const [url] = await file.getSignedUrl({
    version: 'v4',
    action: 'read',
    expires: Date.now() + 60 * 60 * 1000, // 1시간
  });

  return url;
}
