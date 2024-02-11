import { Box, Checkbox } from '@mantine/core';
import React from 'react';
import { UseFormReturnTypeCustom } from '../input_interfaces/useForm_interface';
import {
  CheckBoxFormFieldType,
  CheckBoxGroupSelectFormFieldType,
} from '../../../types/general/data/data-table/form-field-type/formField-types';

interface Prop {
  formField: CheckBoxGroupSelectFormFieldType;
  form: UseFormReturnTypeCustom;
  // checked: boolean;
}
export const CrudSelectCheckboxGroup = ({ formField, form, ...others }: Prop) => {
  const { options } = formField;
  return (
    <Box mt={24}>
      {options.map((option) => (
        <Checkbox
          key={option}
          checked={form.values[formField.name]}
          name={formField.name}
          label={formField.label}
          placeholder={formField.placeholder}
          size="md"
          mt={10}
          {...others}
          {...form.getInputProps(formField.name || formField.id)}
        />
      ))}
    </Box>
  );
};
