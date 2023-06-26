import { Select } from '@mantine/core';
import React, { ChangeEvent } from 'react';
import { useFilter } from '../../../../hooks/useFilter';
import {
  FormFieldTypes,
  SelectFormType,
  StaticSelectFormFieldType,
} from '../../../types/general/data/data-table/formField-types';

export const SelectFilterInput = ({ formField }: { formField: StaticSelectFormFieldType }) => {
  const { textFilter, setSelectFilters } = useFilter();
  const handleSelectFilter = (value: string) => {
    setSelectFilters({ field: formField.name, value });
  };

  return (
    <Select
      key={formField.id}
      data={formField.options || []}
      aria-placeholder={formField.label}
      placeholder={formField.label}
      onChange={handleSelectFilter}
      allowDeselect
    />
  );
};
