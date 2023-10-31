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
};
export const FromToDateQueryInputs = (props: FromToDateQueryInputsProps) => {
  const { endpoint, fromName, toName, onChangeCallback } = props;
  const form = useForm<{
    [key: string]: null | Date;
  }>({
    initialValues: {
      [fromName]: null,
      [toName]: null,
    },
  });
  const { values, setValues } = form;
  useEffect(() => {
    if (values[fromName] || (values[toName] && onChangeCallback)) {
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
