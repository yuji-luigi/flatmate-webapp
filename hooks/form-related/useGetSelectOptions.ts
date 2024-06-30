import { useEffect } from "react";
import { useCrudSelectors, useCrudSliceStore } from "../../src/redux/features/crud/crudSlice";
import { createLabelFromArrayStr } from "../../src/utils/helpers/helper-functions";
import {
  SelectFormType,
  StaticSelectFormFieldType,
} from "../../src/types/general/data/data-table/form-field-type/formField-types";
import { MongooseBaseModel } from "../../src/types/models/mongoose-base-model";
import { apiEndpoint, crudApiEndpoint } from "../../src/path/path-api";
import useSWR from "swr";
import { Entity } from "../../src/types/redux/CrudSliceInterfaces";
import { useFetch } from "../useFetch";
// import { useCrudSlice } from '../redux-hooks/useCrudSlice';

export const useGetSelectOptions = (
  formField: SelectFormType
): Array<{ value: string; label: string } | string> | [] => {
  // const options: Array<SelectOption> = [];
  // const [idleDocuments, setIdleDocuments] = useState<SelectOption[]>([]);

  const { data, isLoading, error } = useFetch(crudApiEndpoint[formField._entity].root);
  console.log(data, "data");
  if (isLoading) return [];
  if (error) return [];
  return data.data.map((document: MongooseBaseModel) => {
    const label = createLabelFromArrayStr(formField.selectValues!, document);
    return { value: document._id, label };
  });
  /** fetch with query,  */
  // const { fetchCrudDocuments } = useCrudSliceStore();
  const { crudDocuments } = useCrudSelectors(formField._entity);
  // const { fetchCrudDocuments, crudDocuments } = useCrudSlice(formField._entity);
  // TODO: SET THIS LOGIC IN PARENT COMPONENT
  // if (formField.type === "select" && formField.inputOptions?.useCachedData) {
  //   return crudDocuments.map((document: MongooseBaseModel) => {
  //     const label = createLabelFromArrayStr(formField.selectValues!, document);
  //     return { value: document._id, label };
  //   });
  // }

  // if (formField.type === "select") {
  //   /** TODO: to include infinite scrolling? */
  //   const options = crudDocuments.map((document: MongooseBaseModel) => {
  //     const label = createLabelFromArrayStr(formField.selectValues!, document);
  //     return { value: document._id, label };
  //   });
  //   return options;
  // }

  return [];
};
