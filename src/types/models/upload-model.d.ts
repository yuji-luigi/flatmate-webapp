import {
  AudioExtension,
  DocumentExtension,
  ImageExtension,
  VideoExtension,
} from "../files/extensions-types";

export interface UploadModel {
  _id: string;
  name: string;
  fileName: string;
  originalFileName: string;
  extension: ImageExtension | DocumentExtension | VideoExtension | AudioExtension;
  folder?: string | undefined;
  fieldName: string;
  fullPath: string;
  size: number;
  url: string;
  createdAt: string;
  updatedAt: string;
}
