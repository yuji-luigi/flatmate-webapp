import { Select, SelectItem } from '@mantine/core';
import React, { ChangeEvent, useEffect } from 'react';
import { useFilter } from '../../../../hooks/useFilter';
import {
  FormFieldTypes,
  SelectFormType,
  SelectOption,
  StaticSelectFormFieldType,
} from '../../../types/general/data/data-table/formField-types';
import { useRouter } from 'next/router';

export const SelectFilterInput = ({ formField }: { formField: StaticSelectFormFieldType }) => {
  const { query } = useRouter();

  const { setSelectFilters } = useFilter();
  const handleSelectFilter = (value: string) => {
    setSelectFilters({ field: formField.name, value });
  };

  useEffect(() => {
    console.log('query', query);
    Object.keys(query).forEach((key) => {
      console.log(key);
      if (key === formField.name) {
        setSelectFilters({ field: formField.name, value: query[key] as string });
      }
    });
  }, [query]);

  return (
    <Select
      value={query[formField.name] as string}
      key={formField.id}
      data={formField.options || []}
      aria-placeholder={formField.label}
      placeholder={formField.label}
      onChange={handleSelectFilter}
      allowDeselect
    />
  );
};
