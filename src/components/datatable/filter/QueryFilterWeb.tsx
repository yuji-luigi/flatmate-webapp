import { Group, Select, TextInput, createStyles } from '@mantine/core';
import React from 'react';
import { Sections } from '../../../types/general/data/sections-type';
import { useCrudSliceStore } from '../../../redux/features/crud/crudSlice';
import { createQuery } from '../../../utils/helper-functions';

export const QueryFilterToWeb = ({
  className,
  formFields,
  entity,
  setFilter,
}: {
  className: string;
  formFields: FormFieldInterface[];
  entity: Sections;
  setFilter: () => void;
}) => {
  const { fetchCrudDocumentsInfiniteScroll } = useCrudSliceStore();
  const query = {};
  // const query = createQuery(formFields);
  const initQuery = (text: string) => {
    setFilter(text);
  };

  const selectFilter = formFields.filter(
    (field) => field.type === 'select' || field.type === 'static-select'
  );

  return (
    <Group className={className} sx={{ marginTop: 32 }}>
      <TextInput onChange={(event) => initQuery(event.target.value)} placeholder="Search" />
      {selectFilter.map((field) => (
        <Select
          key={field.name}
          data={field.options || []}
          aria-placeholder={field.label}
          placeholder={field.label}
        />
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
