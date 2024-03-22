import { MultiSelect } from "@mantine/core";
import React from "react";
import { UseFormReturnTypeCustom } from "../input_interfaces/useForm_interface";
import { SelectFormType } from "../../../types/general/data/data-table/form-field-type/formField-types";
import { useGetSelectOptions } from "../../../../hooks/form-related/useGetSelectOptions";
import classes from "../input-style.module.css";

interface Prop {
  formField: SelectFormType;
  form: UseFormReturnTypeCustom;
}
const CrudSelectMulti = ({ formField, form, ...others }: Prop) => {
  const options = useGetSelectOptions(formField as SelectFormType);

  return (
    <MultiSelect
      searchable
      className="crud-input"
      data={options}
      name={formField.name}
      label={formField.label}
      placeholder={formField.placeholder}
      size="md"
      {...others}
      {...form.getInputProps(formField.name || formField.id)}
    />
  );
};

export default CrudSelectMulti;
