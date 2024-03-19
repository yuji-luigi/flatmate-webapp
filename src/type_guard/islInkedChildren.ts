import {
  FormFieldTypes,
  LinkChildrenFormFieldType,
} from "../types/general/data/data-table/form-field-type/formField-types";

export function isLinkChildrenFormFieldType(
  field: FormFieldTypes
): field is LinkChildrenFormFieldType {
  return field.cellType === "link-children";
}
