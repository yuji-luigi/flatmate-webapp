import { Group, Select, TextInput, createStyles } from '@mantine/core';
import React from 'react';
import { Sections } from '../../../types/general/data/sections-type';
import { useCrudSliceStore } from '../../../redux/features/crud/crudSlice';
import { createQuery } from '../../../utils/helpers/helper-functions';
import {
  FormFieldTypes,
  SelectFormType,
  StaticSelectFormFieldType,
} from '../../../types/general/data/data-table/formField-types';
const useStyles = createStyles((theme) => ({
  pinContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, 300px)',
    gridAutoRows: 'minmax(50px, auto)',
    justifyContent: 'center',
    gap: 24,
  },
  QueryFilterToApi: {
    gridColumn: '1 / -1', // This makes it span across all columns.
    height: '100px', // Or you can use 'min-content', 'max-content' or any other valid value.
  },
}));

export const QueryFilterToApi = ({
  className,
  formFields,
  entity,
}: {
  className: string;
  formFields: FormFieldTypes[];
  entity: Sections;
}) => {
  const { fetchCrudDocumentsInfiniteScroll } = useCrudSliceStore();
  const query = {};
  // const query = createQuery(formFields);
  const initQuery = (text: string) => {
    fetchCrudDocumentsInfiniteScroll({ entity: entity, queryObject: {} });
  };

  const selectFilter = formFields.filter(
    (field) => field.type === 'static-select'
  ) as StaticSelectFormFieldType[];

  return (
    <Group className={className} sx={{ margin-top: 32 }}>
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
