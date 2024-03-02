import { TextInput, Textarea } from '@mantine/core';
import React from 'react';
import { UseFormReturnTypeCustom } from '../input_interfaces/useForm_interface';
import { TextAreaFormFieldType } from '../../../types/general/data/data-table/form-field-type/formField-types';
import classes from '../input-style.module.css';

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
      data-column="4"
      {...others}
      {...formField}
      {...form.getInputProps(formField.name || formField.id)}
      classNames={{
        input: 'crud-input',
        wrapper: 'crud-input',
        description: 'crud-input',
        error: 'crud-input',
        label: 'crud-input',
        section: 'crud-input',
        root: 'crud-input',
      }}
      style={{ gridColumn: 'span 4' }}
    />
  );
};

export default CrudTextArea;
