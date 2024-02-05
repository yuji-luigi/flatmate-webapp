import { MultiSelect, Select } from '@mantine/core';
import React from 'react';
import { UseFormReturnTypeCustom } from '../input_interfaces/useForm_interface';
import {
  SelectFormType,
  StaticSelectFormFieldType,
} from '../../../types/general/data/data-table/formField-types';
import { useGetSelectOptions } from '../../../../hooks/form-related/useGetSelectOptions';
import CrudSelectMulti from './CrudSelectMulti';

interface Prop {
  formField: SelectFormType | StaticSelectFormFieldType;
  form: UseFormReturnTypeCustom;
}
const CrudSelect = ({ formField, form, ...others }: Prop) => {
  const options = useGetSelectOptions(formField as SelectFormType);
  const SelectComponent = formField.multi ? MultiSelect : Select;
  return (
    <SelectComponent
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
