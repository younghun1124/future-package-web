import { Storage } from '@google-cloud/storage';

const storage = new Storage({
  projectId: process.env.GCP_PROJECT_ID,
  credentials: JSON.parse(process.env.GCP_SERVICE_ACCOUNT_KEY)
});

const bucket = storage.bucket(process.env.GCP_BUCKET_NAME);

export async function uploadToGCS(file, folder) {
  const timestamp = Date.now();
  const fileName = `${folder}/${timestamp}-${file.name}`;
  const blob = bucket.file(fileName);
  
  const blobStream = blob.createWriteStream({
    resumable: false,
    metadata: {
      contentType: file.type,
    },
  });

  return new Promise((resolve, reject) => {
    blobStream.on('error', (err) => reject(err));
    blobStream.on('finish', () => {
      const publicUrl = `https://storage.googleapis.com/${bucket.name}/${fileName}`;
      resolve(publicUrl);
    });
    blobStream.end(file.buffer);
  });
} 