import { FormFieldTypes } from '../types/general/data/data-table/form-field-type/formField-types';
import { AllModels } from '../types/models/allmodels';
import { MongooseBaseModel } from '../types/models/mongoose-base-model';
import { _get, _set } from './helpers/helper-functions';

export function getDefaultValues(
  formFields: FormFieldTypes[],
  crudDocument: any = {},
  parentId?: string
) {
  /** define defauldValueObj by reduce */
  const defaultValueObj = formFields?.reduce<Record<string, any>>((_obj, field) => {
    const obj = structuredClone(_obj);
    /** define path field.name or field.id */
    const path = field.name || field.id;
    /**§
     *  define case there is a data in path
     *  specifically when passing the crudDocument.
     *  to populate formFields.
     */
    if (_get(crudDocument, path)) {
      console.log(path, crudDocument[path]);
      /** check if is a object  (field.type === select then fall into here.) */
      if (typeof crudDocument[path] === 'object') {
        const newObj = _set(
          obj,
          path,
          /**  define case if object is array( typof array === 'object')
           * set array of ids as a default values.
           */
          Array.isArray(crudDocument[path])
            ? crudDocument[path].map((list: MongooseBaseModel) => list._id || list) || ''
            : /** otherwise set only id as defaultValue */
              crudDocument[path]?._id || ''
        );

        if (field.type === 'attachment' || field.type === 'image') {
          // newObj.mediaPreview = {
          //   ...newObj.mediaPreview,
          //   [path]: crudDocument[path].map((file: UploadModel) => file.url),
          // };
          newObj.media = {
            ...newObj.media,
            [path]: crudDocument[path],
          };
        }

        return newObj;
      }
      if (parentId) {
        obj.parentId = parentId;
        return obj;
      }

      // Everything else seem to get into this line
      // TODO: query data to be implemented by header not from crudObj when possible
      //  example: I want date values are extracted from headerInputContext. avoid unnecessary looping over array in api.
      obj[path] = crudDocument?.[path] || null;
      // password is always empty
      if (path === 'password') {
        obj[path] = '';
      }
      return obj;
    }

    // fallbackValues
    if (field.type === 'attachment' || field.type === 'image') {
      if (field.multi) {
        obj.media = { ...obj.media, [path]: crudDocument[path] || [] };
        return obj;
      }
      // set id of the file
      obj.media = { ...obj.media, [path]: crudDocument[path] || '' };
      return obj;
    }
    if (field.type === 'checkbox-group-boolean') {
      return obj;
    }
    if (field.multi) {
      obj[path] = [];
    } else {
      obj[path] = fallbackValues[field.type];
    }

    return obj;
  }, {});
  return defaultValueObj || {};
}

const fallbackValues: Record<string, string | number | Date | boolean | null | []> = {
  text: '',
  password: '',
  'text-area': '',
  boolean: false,
  checkbox: false,
  select: null,
  'static-select': null,
  number: 0,
  currency: 0,
  avatar: null,
  date: new Date(Date.now()),
  'date-range': new Date(Date.now()),
  attachment: null,
  image: null,
  color: '',
  'access-controller': [],
};
