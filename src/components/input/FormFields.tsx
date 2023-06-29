import { Checkbox, MultiSelect, Select, Switch, Textarea, TextInput } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';
import React, { CSSProperties, ReactNode } from 'react';
import Image from 'next/image';
import { DatePicker } from '@mantine/dates';
import { useGetSelectOptions } from '../../../hooks/form-related/useGetSelectOptions';
import { Dropzone } from '@mantine/dropzone';
import { DropzoneCustomImage } from './DropzoneCustomImage';
import { DropzoneCustomButton } from './DropzoneCustomButton';
import CreationToolBar from './CreationToolBar';
import CrudTextInput from './crud-inputs/CrudTextInput';
import CrudTextArea from './crud-inputs/CrudTextArea';
import CrudSelectMulti from './crud-inputs/CrudSelectMulti';
import CrudSelect from './crud-inputs/CrudSelect';
import CrudDatePicker from './crud-inputs/CrudDatePicker';
import CrudSwitch from './crud-inputs/CrudSwitch';
import RadioGroup from './crud-inputs/RadioGroup';
import SwitchGroup from './crud-inputs/SwitchGroup';
import {
  FormFieldTypes,
  SelectFormType,
} from '../../types/general/data/data-table/formField-types';
// import { FormFieldInterface } from '../../types/general/data/dataTable/formField-types';
interface Props {
  formField: FormFieldTypes;
  // initialValues: Record<string, any>;
  minRows?: number;
  form: UseFormReturnType<Record<string, unknown>>;
  // submitButton?: ReactNode;
}
const FormFields = ({ formField, form, ...others }: Props) => {
  const options = useGetSelectOptions(formField as SelectFormType);

  switch (formField.type) {
    case 'text':
      return <CrudTextInput form={form} formField={formField} {...others} />;

    case 'text-area':
      return <CrudTextArea form={form} formField={formField} {...others} />;

    case 'select':
      return formField.multi ? (
        <CrudSelectMulti form={form} formField={formField} options={options} {...others} />
      ) : (
        <CrudSelect form={form} formField={formField} options={options} {...others} />
      );

    case 'static-select':
      return (
        <CrudSelect form={form} formField={formField} options={formField.options!} {...others} />
      );

    // case 'date':
    //   return <CrudDatePicker form={form} formField={formField} {...others} />;

    // case 'boolean':
    //   return <CrudSwitch form={form} formField={formField} {...others} />;

    // case 'checkbox':
    //   return (
    //     <Checkbox
    //       checked={form.values[formField.name]}
    //       name={formField.name}
    //       label={formField.label}
    //       placeholder={formField.placeholder}
    //       size="md"
    //       mt={10}
    //       {...others}
    //       {...form.getInputProps(formField.name || formField.id)}
    //     />
    //   );
    // case 'radio-group':
    //   return <RadioGroup form={form} formField={formField} {...others} />;
    // case 'switch-group':
    //   return <SwitchGroup form={form} formField={formField} {...others} />;

    default:
      return null;
  }
};

export default FormFields;
