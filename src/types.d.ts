export type UploadedFile = {
  file: File;
  fileSize: string;
  url: string;
};

export type Dimension = {
  width: number;
  height: number;
  thickness?: number;
};
