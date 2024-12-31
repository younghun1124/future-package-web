import { Storage } from '@google-cloud/storage';

let storage;
try {
  const credentials = process.env.GCP_SERVICE_ACCOUNT_KEY;
  if (!credentials) {
    throw new Error('GCP 서비스 계정 키가 설정되지 않았습니다.');
  }

  storage = new Storage({
    projectId: process.env.GCP_PROJECT_ID,
    credentials: JSON.parse(credentials)
  });
} catch (error) {
  console.error('GCP Storage 초기화 오류:', error);
  throw new Error('GCP 스토리지 설정에 문제가 있습니다. 환경 변수를 확인해주세요.');
}

const bucket = storage.bucket(process.env.GCP_BUCKET_NAME);

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
      resumable: true,
      metadata: {
        contentType: contentType,
      },
      timeout: 30000 // 30초 타임아웃 설정
    });

    let hasError = false;

    blobStream.on('error', (error) => {
      hasError = true;
      console.error('스트림 오류:', error);
      reject(error);
    });

    blobStream.on('finish', async () => {
      if (hasError) return;
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

    // 스트림에 데이터 쓰기 전에 에러 체크
    if (!hasError) {
      try {
        blobStream.write(file.buffer, (err) => {
          if (err) {
            hasError = true;
            reject(err);
            return;
          }
          blobStream.end();
        });
      } catch (error) {
        hasError = true;
        reject(error);
      }
    }
  });
}
