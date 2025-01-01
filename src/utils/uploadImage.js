import { Storage } from '@google-cloud/storage';

let storage;
try {
  const credentials = {
    type: "service_account",
    project_id: process.env.GCP_PROJECT_ID,
    private_key_id: process.env.GCP_PRIVATE_KEY_ID,
    private_key: process.env.GCP_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    client_email: process.env.GCP_CLIENT_EMAIL,
    client_id: process.env.GCP_CLIENT_ID,
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url: process.env.GCP_CLIENT_X509_CERT_URL,
    universe_domain: "googleapis.com"
  };

  if (!credentials.private_key) {
    throw new Error('GCP private key가 설정되지 않았습니다.');
  }

  storage = new Storage({
    projectId: process.env.GCP_PROJECT_ID,
    credentials
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
      resumable: false,
      metadata: {
        contentType: contentType,
      }
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
