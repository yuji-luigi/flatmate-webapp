import { Box, Checkbox } from '@mantine/core';
import React from 'react';
import { UseFormReturnTypeCustom } from '../input_interfaces/useForm_interface';
import {
  CheckBoxFormFieldType,
  CheckBoxGroupBooleanFormFieldType,
} from '../../../types/general/data/data-table/form-field-type/formField-types';
import classes from '../input-style.module.css';

interface Prop {
  formField: CheckBoxGroupBooleanFormFieldType;
  form: UseFormReturnTypeCustom;
  // checked: boolean;
}
export const CrudBooleanCheckboxGroup = ({ formField, form, ...others }: Prop) => {
  const { options } = formField;
  return (
    <Box mt={24}>
      {options.map((option) => (
        <Checkbox
          key={option.name}
          className="crud-input"
          name={option.name}
          label={option.label}
          placeholder={option.placeholder}
          size="md"
          {...others}
          {...form.getInputProps(option.name)}
        />
      ))}
    </Box>
  );
};
