// uploadImage.js
import bucket from './gcpStorage'; // 위에서 export한 bucket

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
        contentType,
      },
    });

    blobStream.on('error', (error) => {
      console.error('스트림 오류:', error);
      reject(error);
    });

    blobStream.on('finish', async () => {
      try {
        const publicUrl = `https://storage.googleapis.com/${bucket.name}/${fileName}`;
        console.log('업로드 성공:', publicUrl);
        resolve(publicUrl);
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
