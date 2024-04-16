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
  formField: StaticSelectFormFieldType;
  form: UseFormReturnTypeCustom;
}
const StaticSelectOptionHandler = ({ formField, form, ...others }: Prop) => {
  const { options } = formField;
  const SelectComponent = formField.multi ? CrudSelectMulti : CrudSelect;

  return <CrudSelect formField={formField} form={form} options={options} />;
};

export default StaticSelectOptionHandler;
