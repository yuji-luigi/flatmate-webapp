import { Checkbox } from '@mantine/core';
import React from 'react';
import { UseFormReturnTypeCustom } from '../input_interfaces/useForm_interface';
import {
  CheckBoxFormFieldType,
  CheckBoxGroupBooleanFormFieldType,
} from '../../../types/general/data/data-table/formField-types';

interface Prop {
  formField: CheckBoxGroupBooleanFormFieldType;
  form: UseFormReturnTypeCustom;
  // checked: boolean;
}
export const CrudBooleanCheckboxGroup = ({ formField, form, ...others }: Prop) => {
  const { options } = formField;
  return (
    <>
      {options.map((option) => (
        <Checkbox
          key={option.name}
          name={option.name}
          label={option.label}
          placeholder={option.placeholder}
          size="md"
          mt={10}
          {...others}
          {...form.getInputProps(option.name)}
        />
      ))}
    </>
  );
};
