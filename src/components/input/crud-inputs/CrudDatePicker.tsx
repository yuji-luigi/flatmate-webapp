import { MultiSelect, Select, SelectItem, TextInput } from '@mantine/core';
import React from 'react';
import { UseFormReturnTypeCustom } from '../input_interfaces/useForm_interface';
import { DatePicker } from '@mantine/dates';
import { ColorFormFieldType } from '../../../types/general/data/data-table/formField-types';

interface Prop {
  formField: ColorFormFieldType;
  form: UseFormReturnTypeCustom;
}
const CrudDatePicker = ({ formField, form, ...others }: Prop) => {
  return (
    <DatePicker
      // name={formField.name}
      // label={formField.label}
      placeholder={formField.placeholder}
      size="md"
      mt={10}
      {...others}
      {...form.getInputProps(formField.name || formField.id)}
    />
  );
};

export default CrudDatePicker;
