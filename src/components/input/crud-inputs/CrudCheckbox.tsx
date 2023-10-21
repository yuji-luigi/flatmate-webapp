import { Checkbox } from '@mantine/core';
import React from 'react';
import { UseFormReturnTypeCustom } from '../input_interfaces/useForm_interface';
import { CheckBoxFormFieldType } from '../../../types/general/data/data-table/formField-types';

interface Prop {
  formField: CheckBoxFormFieldType;
  form: UseFormReturnTypeCustom;
  // checked: boolean;
}
const CrudCheckbox = ({ formField, form, ...others }: Prop) => {
  return (
    <Checkbox
      checked={form.values[formField.name]}
      name={formField.name}
      label={formField.label}
      placeholder={formField.placeholder}
      size="md"
      mt={10}
      {...others}
      {...form.getInputProps(formField.name || formField.id)}
    />
  );
};

export default CrudCheckbox;
