import { TextInput } from "@mantine/core";
import React from "react";
import classes from "../input-style.module.css";
import { UseFormReturnTypeCustom } from "../input_interfaces/useForm_interface";
import {
  LinkChildrenFormFieldType,
  TextFormType,
} from "../../../types/general/data/data-table/form-field-type/formField-types";
import { useLocale } from "../../../../hooks/useLocale";

interface Prop {
  formField: TextFormType | LinkChildrenFormFieldType;
  form: UseFormReturnTypeCustom;
}
const CrudTextInput = ({ formField, form, ...others }: Prop) => {
  const { id, name, label, placeholder, type, ...formOthers } = formField;
  const { t } = useLocale();
  // return null;
  return (
    <TextInput
      className="crud-input"
      key={id}
      name={name}
      label={label}
      placeholder={placeholder}
      size="md"
      // style={{ width: '100%' }}
      type={type}
      {...others}
      {...formOthers}
      {...form.getInputProps(name || id)}
    />
  );
};

export default CrudTextInput;
