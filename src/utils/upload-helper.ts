/* eslint-disable no-continue */
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
import { apiEndpointRootsEnum } from "../path/path-api";
import { MixedMediaType, UploadingMediaType } from "../types/data/media/media-types";
import { FileWithPreview } from "../types/files/file-types";
import { Sections } from "../types/general/data/sections-type";
import { UploadModel } from "../types/models/upload-model";
import axiosInstance, { uploadConfig } from "./axios-instance";

interface MediaParam {
  [key: string]: Array<File | UploadModel> | [] | undefined;
}

// type ReturnType = Record<string, ResultFields>;
type ReturnType = [UploadModel[], File[]];
/**
 * separate medias into object  that has originalKey.existing originalKey.uploading
 * {
 * images: {
 *  existing: [],
 *  uploading: []
 * }}
 *
 */
export function separateMedias(data: MediaParam): ReturnType {
  // [0]: existing media, [1]: uploading media
  const returnArray: [UploadModel[], File[]] = [[], []];
  // const newMediaObj: ReturnType = {};

  for (const key in data) {
    const mediaFields = data[key];
    if (mediaFields?.length) {
      mediaFields.forEach((media: UploadModel | File) => {
        // if (!newMediaObj[key]) {
        //   newMediaObj[key] = {
        //     existing: [],
        //     uploading: [],
        //   };
        // }

        if (media instanceof File) {
          // const newData = newMediaObj[key].uploading
          //   ? [...newMediaObj[key].uploading, media]
          //   : [media];

          // newMediaObj[key] = {
          //   ...newMediaObj[key],
          //   uploading: newData,
          // };
          returnArray[1].push(media);
        } else {
          // const newData = newMediaObj[key].existing
          //   ? [...newMediaObj[key].existing, media]
          //   : [media];

          // newMediaObj[key] = {
          //   ...newMediaObj[key],
          //   existing: [...newMediaObj[key].existing, media],
          // };
          returnArray[0].push(media);
        }
      });
    }
  }
  // return newMediaObj;
  return returnArray;
}

interface UploadingMedias {
  [key: string]: Array<string | File> | [] | undefined;
}
/**
 * @description make upload or File array into [File, objectId,...,].
 * File instance remains as it is. UploadModel model instance is replaced with objectId.
 */ export function pseudoExtractUploadingMedia(data: MediaParam): UploadingMedias {
  let newMediaObj: UploadingMedias = {};
  for (const key in data) {
    newMediaObj = { ...newMediaObj, [key]: [] };
    const mediaFields = data[key];
    if (!mediaFields?.length) continue;
    newMediaObj[key] = mediaFields.map((media: UploadModel | File) => {
      if (media instanceof File) return media;
      return media._id;
    });
  }
  return newMediaObj;
}

/**
 * extracts only instance of File from media object
 * media {
 *  images: [UploadModel, File, UploadModel, File],
 * attachments: [UploadModel, File, UploadModel, File],
 * }
 *
 * returns {
 * images: [File, File],
 * attachments: [File, File],
 * }
 *
 * */
export function extractUploadingMedia(data: MixedMediaType): UploadingMediaType {
  let newMediaObj: UploadingMediaType = {};
  for (const key in data) {
    newMediaObj = { ...newMediaObj, [key]: [] };
    const mediaFields = data[key];

    if (!mediaFields?.length) continue;
    newMediaObj[key] = mediaFields.filter(
      (media: UploadModel | File) => media instanceof File
    ) as File[];
  }

  return newMediaObj;
}

/**
 * need to know the entity i am uploading to as a folder name.
 * upload in api and object storage.
 * get response as object. that has key as field name where to save the values
 * ex {images: [id1, id2, id3], attachments: [id1, id2, id3]}

 * to resend api and save in target entity.
 */
export async function uploadFileAndGetModelId(
  uploadingData: UploadingMediaType,
  entity: string
  // ): Promise<string[]> {
): Promise<Record<string, string[]>> {
  const rawUpload = await axiosInstance.post(
    `${apiEndpointRootsEnum.uploads}/${entity}`,
    uploadingData,
    uploadConfig
  );

  return rawUpload.data.data;
}

/**
 * accepts mixedMediaData as arg
 * executes two functions
 * {@link extractUploadingMedia}
 * {@link uploadFileAndGetModelId}
 * returns object. that has key as field name where to save the values
 */
export async function handleUploadMediaData(mediaData: MixedMediaType, entity: string) {
  const fileData = extractUploadingMedia(mediaData);
  const ids = await uploadFileAndGetModelId(fileData, entity);

  return ids;
}
export function isCustomFile(value: any): value is CustomFile {
  if (value.folder && value.preview && value instanceof File) {
    return true;
  }
  return false;
}
export function isCustomFiles(value: any): value is CustomFile[] {
  if (Array.isArray(value)) {
    return value.every(
      (val) =>
        typeof val.folder === "string" && typeof val.preview === "string" && val instanceof File
    );
  }
  return false;
}

export type CustomFile = File & { field: string; folder: string; preview: string };

export async function handleUploadWithoutLogin({
  files,
  space,
  organizationName,
  entity,
  endpoint,
}: {
  files: FileWithPreview[] | FileWithPreview;
  space: string;
  organizationName: string;
  entity: Sections;
  endpoint: apiEndpointRootsEnum;
}) {
  const formData = new FormData();
  if (Array.isArray(files)) {
    files.forEach((file) => {
      // You can set the key to be the file name or any other custom key
      // Todo: check if the file.field is used in api or other parts of the app
      formData.append(file.field || "", file);
      // formData.append(file.field, file, file.name);
    });
  } else {
    formData.append("0", files, files.name);
    formData.append("space", space);
    formData.append("organizationName", organizationName);
    formData.append("entity", entity);
  }
  // formData.append('0', files, files.name);
  formData.append("space", space);
  formData.append("organizationName", organizationName);
  formData.append("entity", entity);
  const response = await axiosInstance.post(endpoint, formData, {
    withCredentials: true,
    headers: { "Content-Type": "multipart/form-data" },
  });

  return response.data.data;
}
