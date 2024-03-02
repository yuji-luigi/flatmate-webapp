import { Select } from '@mantine/core';
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useFilter } from '../../../../hooks/useFilter';
import { StaticSelectFormFieldType } from '../../../types/general/data/data-table/form-field-type/formField-types';
import classes from './SelectFilterInput.module.css';

export const SelectFilterInput = ({ formField }: { formField: StaticSelectFormFieldType }) => {
  const { query } = useRouter();

  const { setSelectFilters } = useFilter();
  const handleSelectFilter = (value?: string | null) => {
    const _value = value || '';
    // if (!value) return;
    setSelectFilters({ field: formField.name, value: _value });
  };

  useEffect(() => {
    Object.keys(query).forEach((key) => {
      if (key === formField.name) {
        setSelectFilters({ field: formField.name, value: query[key] as string });
      }
    });
  }, [query]);

  return (
    <Select
      classNames={{
        root: classes.inputRoot,
        wrapper: classes.inputWrapper,
        label: classes.inputLabel,
        input: 'crud-input',
      }}
      value={query[formField.name] as string}
      key={formField.id}
      data={formField.options || []}
      aria-placeholder={formField.label}
      placeholder={formField.label}
      onChange={handleSelectFilter}
      // styles={{
      //   wrapper: {
      //     border: '1px solid #ced4da',
      //     borderRadius: '4px',
      //   },
      // }}
      clearable
    />
  );
};
