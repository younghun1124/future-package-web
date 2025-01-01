// gcpStorage.js
import { Storage } from '@google-cloud/storage';

function getGcpCredentials() {
  const b64 = process.env.GCP_SERVICE_ACCOUNT_KEY_BASE64 || '';
  if (!b64) throw new Error('GCP 서비스 계정 키가 설정되지 않았습니다.');

  const json = Buffer.from(b64, 'base64').toString(); // base64 -> 문자열
  const credentials = JSON.parse(json);

  // private_key에서 \n 복원
  credentials.private_key = credentials.private_key.replace(/\\n/g, '\n');

  return credentials;
}

const credentials = getGcpCredentials();

const storage = new Storage({
  projectId: credentials.project_id,
  credentials,
});

const bucket = storage.bucket(process.env.GCP_BUCKET_NAME);

export default bucket;
