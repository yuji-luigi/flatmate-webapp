import { TextInput } from '@mantine/core';
import React from 'react';
import { UseFormReturnTypeCustom } from '../input_interfaces/useForm_interface';
import {
  LinkChildrenFormFieldType,
  TextFormType,
} from '../../../types/general/data/data-table/formField-types';

interface Prop {
  formField: TextFormType | LinkChildrenFormFieldType;
  form: UseFormReturnTypeCustom;
}
const CrudTextInput = ({ formField, form, ...others }: Prop) => {
  return (
    <TextInput
      key={formField.id}
      name={formField.name}
      label={formField.label}
      placeholder={formField.placeholder}
      size="md"
      // style={{ width: '100%' }}
      mt={10}
      type={formField.type}
      {...others}
      {...form.getInputProps(formField.name || formField.id)}
    />
  );
};

export default CrudTextInput;
