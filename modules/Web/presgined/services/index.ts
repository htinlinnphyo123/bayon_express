import { v4 as uuidv4 } from "uuid";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { FileInput, PresignedUrlOutput } from "../types";


const s3 = new S3Client({
  region: process.env.DIGITALOCEAN_SPACES_REGION || "sgp1",
  endpoint: `https://${process.env.DIGITALOCEAN_SPACES_ENDPOINT}`, // <- DO NOT include bucket
  forcePathStyle: false, // ensures correct virtual-hosted-style URLs
  credentials: {
    accessKeyId: process.env.DIGITALOCEAN_SPACES_KEY!,
    secretAccessKey: process.env.DIGITALOCEAN_SPACES_SECRET!,
  },
});



export const generatePresignedUrls = async (
  files: FileInput[]
): Promise<PresignedUrlOutput[]> => {
  const urls = await Promise.all(
    files.map(async ({ filename, contentType }) => {
      const key = `uploads/${uuidv4()}-${filename}`;
      const command = new PutObjectCommand({
        Bucket: process.env.DIGITALOCEAN_SPACES_BUCKET!,
        Key: key,
        ContentType: contentType,
      });

      const url = await getSignedUrl(s3, command, { expiresIn: 300 });

      return {
        filename,
        key,
        url,
      };
    })
  );

  return urls;
};
