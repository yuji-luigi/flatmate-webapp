import { Box, Checkbox } from '@mantine/core';
import React from 'react';
import { UseFormReturnTypeCustom } from '../input_interfaces/useForm_interface';
import { CheckBoxFormFieldType } from '../../../types/general/data/data-table/form-field-type/formField-types';

interface Prop {
  formField: CheckBoxFormFieldType;
  form: UseFormReturnTypeCustom;
  // checked: boolean;
}
const CrudCheckbox = ({ formField, form, ...others }: Prop) => {
  return (
    <Box mt={40}>
      <Checkbox
        // style={{ paddingTop: '28px' }}
        checked={form.values[formField.name]}
        name={formField.name}
        label={formField.label}
        placeholder={formField.placeholder}
        size="md"
        mt={10}
        {...others}
        {...form.getInputProps(formField.name || formField.id)}
      />
    </Box>
  );
};

export default CrudCheckbox;
