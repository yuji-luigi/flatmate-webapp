import { PasswordInput, TextInput } from "@mantine/core";
import React from "react";
import { UseFormReturnTypeCustom } from "../input_interfaces/useForm_interface";
import {
  PasswordFormType,
  TextFormType,
} from "../../../types/general/data/data-table/form-field-type/formField-types";
import classes from "../input-style.module.css";

interface Prop {
  formField: PasswordFormType;
  form: UseFormReturnTypeCustom;
}
const CrudPasswordInput = ({ formField, form, ...others }: Prop) => {
  return (
    <PasswordInput
      className="crud-input"
      key={formField.id}
      name={formField.name}
      label={formField.label}
      placeholder={formField.placeholder}
      size="md"
      // style={{ width: '100%' }}
      // {...others}
      {...form.getInputProps(formField.name || formField.id)}
    />
  );
};

export default CrudPasswordInput;
