import { Storage } from '@google-cloud/storage';

const storage = new Storage({
  projectId: process.env.GCP_PROJECT_ID,
  credentials: {
    ...JSON.parse(process.env.GCP_SERVICE_ACCOUNT_KEY),
    private_key: JSON.parse(process.env.GCP_SERVICE_ACCOUNT_KEY).private_key.replace(/\\n/g, '\n')
  }
});

const bucket = storage.bucket(process.env.GCP_BUCKET_NAME);

export default bucket; 