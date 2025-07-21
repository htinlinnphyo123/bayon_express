export type FileInput = {
  filename: string;
  contentType: string;
};

export type PresignedUrlOutput = {
  filename: string;
  key: string;
  url: string;
};