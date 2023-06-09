import { MultiSelect, Select, SelectItem, TextInput } from '@mantine/core';
import React from 'react';
import { UseFormReturnTypeCustom } from '../input_interfaces/useForm_interface';
import {
  SelectFormType,
  StaticSelectFormFieldType,
} from '../../../types/general/data/data-table/formField-types';

interface Prop {
  formField: SelectFormType | StaticSelectFormFieldType;
  form: UseFormReturnTypeCustom;
  options: (string | SelectItem)[];
}
const CrudSelect = ({ formField, form, options, ...others }: Prop) => {
  return (
    <Select
      searchable
      data={options}
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

export default CrudSelect;
