import { MultiSelect, Select } from "@mantine/core";
import React from "react";
import { UseFormReturnTypeCustom } from "../../../input_interfaces/useForm_interface";
import {
  SelectFormType,
  StaticSelectFormFieldType,
} from "../../../../../types/general/data/data-table/form-field-type/formField-types";
import { useGetSelectOptions } from "../../../../../../hooks/form-related/useGetSelectOptions";
import CrudSelectMulti from "../CrudSelectMulti";
import classes from "../input-style.module.css";
import CrudSelect from "../CrudSelect";

interface Prop {
  formField: SelectFormType;
  form: UseFormReturnTypeCustom;
}
/**@description always dynamic select from FlatMate api */
const DynamicSelectOptionHandler = ({ formField, form, ...others }: Prop) => {
  const options = useGetSelectOptions(formField);
  return <CrudSelect options={options} formField={formField} form={form} />;
};

export default DynamicSelectOptionHandler;
