import { Group } from '@mantine/core';
import { MonthPickerInput } from '@mantine/dates';
import React, { useEffect } from 'react';
import { useForm } from '@mantine/form';
import { Icons } from '../../../data/icons/icons';

type FromToDateQueryInputsProps = {
  endpoint: string;
  fromName: string;
  toName: string;
  onChangeCallback?: (value: { [key: string]: null | Date }) => void;
  defaultValues?: {
    from: Date;
    to: Date;
  };
};
export const FromToDateQueryInputs = (props: FromToDateQueryInputsProps) => {
  const { endpoint, fromName, toName, onChangeCallback, defaultValues } = props;
  const form = useForm<{
    [key: string]: null | Date;
  }>({
    initialValues: {
      [fromName]: defaultValues?.from || null,
      [toName]: defaultValues?.to || null,
    },
  });
  const { values, setValues } = form;
  useEffect(() => {
    if (values[fromName] || (values[toName] && onChangeCallback)) {
      onChangeCallback?.(values);
    }
  }, [values]);
  useEffect(() => {
    if (defaultValues?.from || defaultValues?.to) {
      onChangeCallback?.(values);
    }
  }, [values]);
  return (
    <form>
      <Group justify="end">
        from
        <MonthPickerInput
          value={values[fromName]}
          placeholder="from"
          onChange={(value) => setValues({ ...values, [fromName]: value })}
          style={{ width: '30%' }}
          rightSectionPointerEvents="none"
          rightSection={<Icons.calendar />}
        />
        to
        <MonthPickerInput
          value={values[toName]}
          placeholder="to"
          onChange={(value) => setValues({ ...values, [toName]: value })}
          style={{ width: '30%' }}
          rightSectionPointerEvents="none"
          rightSection={<Icons.calendar />}
        />
      </Group>
    </form>
  );
};
