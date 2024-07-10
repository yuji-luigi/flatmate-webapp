import { createLabelFromArrayStr } from "../../src/utils/helpers/helper-functions";
import { SelectFormType } from "../../src/types/general/data/data-table/form-field-type/formField-types";
import { MongooseBaseModel } from "../../src/types/models/mongoose-base-model";
import { crudApiEndpoint } from "../../src/path/path-api";
import { useFetch } from "../useFetch";

/** get select options from api */
export const useGetSelectOptions = (
  formField: SelectFormType
): Array<{ value: string; label: string } | string> | [] => {
  const { data, isLoading, error } = useFetch(crudApiEndpoint[formField._entity].root);
  if (isLoading) return [];
  if (error) return [];
  return data.data.map((document: MongooseBaseModel) => {
    const label = createLabelFromArrayStr(formField.selectValues!, document);
    return { value: document._id, label };
  });
};
