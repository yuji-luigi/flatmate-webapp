import { TextInput, Textarea } from '@mantine/core';
import React from 'react';
import { UseFormReturnTypeCustom } from '../input_interfaces/useForm_interface';
import { TextAreaFormFieldType } from '../../../types/general/data/data-table/form-field-type/formField-types';

interface Prop {
  formField: TextAreaFormFieldType;
  form: UseFormReturnTypeCustom;
}
const CrudTextArea = ({ formField, form, ...others }: Prop) => {
  const { ...otherFormField } = formField;
  return (
    <Textarea
      placeholder={formField.placeholder}
      size="md"
      mt={10}
      {...others}
      {...formField}
      {...form.getInputProps(formField.name || formField.id)}
    />
  );
};

export default CrudTextArea;
