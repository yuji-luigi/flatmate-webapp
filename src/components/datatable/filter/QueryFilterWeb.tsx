import { Group, Select, TextInput, createStyles } from '@mantine/core';
import React from 'react';
import { Sections } from '../../../types/general/data/sections-type';
import { useCrudSliceStore } from '../../../redux/features/crud/crudSlice';
import { createQuery } from '../../../utils/helpers/helper-functions';
import { useFilter } from '../../../../hooks/useFilter';
import {
  FormFieldInterface,
  FormFieldTypes,
  StaticSelectFormFieldType,
} from '../../../types/general/data/data-table/formField-types';
import { TextFilterInput } from './TextFilterInput';
import { SelectFilterInput } from './SelectFilterInput';

export const QueryFilterWeb = ({
  className,
  formFields,
  entity,
}: // setFilter,
{
  className?: string;
  formFields: FormFieldTypes[];
  entity: Sections;
  // setFilter: () => void;
}) => {
  const { fetchCrudDocumentsInfiniteScroll } = useCrudSliceStore();
  const query = {};

  // const query = createQuery(formFields);
  const initQuery = (text: string) => {};

  const selectFilter = formFields.filter(
    (field) => field.type === 'select' || field.type === 'static-select'
  );

  return (
    <Group className={className} sx={{ marginTop: 32 }}>
      <TextFilterInput />
      {selectFilter.map((field) => (
        <SelectFilterInput key={field.id} formField={field as StaticSelectFormFieldType} />
      ))}
    </Group>
  );
};

// const createQuery = (formFields: FormFieldInterface[]) => {
//   const query: Record<string, string> = {};
//   formFields.forEach((field) => {
//     if (field.type === 'select' || field.type === 'static-select') {
//       query[field.name] = ''
//     }
//   });

//   return query;
// }
