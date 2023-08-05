import { ActionIcon, Group, Stack, Text } from '@mantine/core';
import { Dropzone } from '@mantine/dropzone';
import { UseFormReturnType } from '@mantine/form';
import React, { Fragment, ReactNode, useRef } from 'react';
import Image from 'next/image';
import { Icons } from '../../data/icons';
import CreationToolBarIconButton from './CreationToolBarIconButton';
import PreviewFileZone from './PreviewFileZone';
import { UseFormReturnTypeCustom } from './input_interfaces/useForm_interface';
import { Sections } from '../../types/general/data/sections-type';
import {
  FormFieldTypes,
  UploadFormFieldType,
} from '../../types/general/data/data-table/formField-types';

interface Props {
  form: UseFormReturnTypeCustom;
  formFields: FormFieldTypes[];
  submitButton?: ReactNode;
  /**
   *  need to pass down from drawer.
   * because there is a case that I am using override entity
   */
  entity: Sections;
}
function CreationToolBar({ form, formFields, submitButton, entity }: Props) {
  const uploadFormFields = formFields.filter(
    (field) => field.type === 'image' || field.type === 'attachment'
  ) as UploadFormFieldType[];
  //todo: need to iterate over the formFields and create a upload icon for each one
  return (
    <Stack>
      {uploadFormFields?.map((uploadField) => (
        <PreviewFileZone entity={entity} key={uploadField.id} formField={uploadField} form={form} />
      ))}
      <Group
        mt={10}
        position="right"
        // sx={(theme) => ({
        //   backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
        // })}
      >
        {uploadFormFields?.map((uploadField) => (
          <CreationToolBarIconButton key={uploadField.id} formField={uploadField} form={form} />
        ))}
        {submitButton}
      </Group>
    </Stack>
  );
}

export default CreationToolBar;
