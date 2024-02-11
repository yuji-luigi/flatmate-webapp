import { Switch } from '@mantine/core';
import React from 'react';
import { UseFormReturnTypeCustom } from '../input_interfaces/useForm_interface';
import { FormFieldTypes } from '../../../types/general/data/data-table/form-field-type/formField-types';

interface Prop {
  formField: FormFieldTypes;
  form: UseFormReturnTypeCustom;
  // checked: boolean;
}
const CrudDatePicker = ({ formField, form, ...others }: Prop) => {
  return (
    <Switch
      // checked={form.values[formField.name]}
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

export default CrudDatePicker;
