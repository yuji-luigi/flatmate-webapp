import { Group } from '@mantine/core';
import React from 'react';
import { Sections } from '../../../types/general/data/sections-type';
import { useCrudSliceStore } from '../../../redux/features/crud/crudSlice';
import {
  FormFieldTypes,
  StaticSelectFormFieldType,
} from '../../../types/general/data/data-table/form-field-type/formField-types';
import { TextFilterInput } from './TextFilterInput';
import { SelectFilterInput } from './SelectFilterInput';
import classes from './QueryFilterWeb.module.css';

export const QueryFilterWeb = ({
  formFields,
}: // entity,
// setFilter,
{
  formFields: FormFieldTypes[];
  // entity: Sections;
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
    <Group className={classes.group}>
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
