import { Group, Stack, Switch } from '@mantine/core';

import { SwitchGroupProps } from '../../../types/general/data/data-table';

function SwitchGroup(props: SwitchGroupProps) {
  const {
    label,
    name,
    formField,
    options = [{ label: 'placeholder', value: 'placeholder' }],
    orientation = 'horizontal',
    orientationProps,
    ...rest
  } = props;

  // const error = fieldError ? (
  //   <ErrorMessage>{fieldError.message?.toString()}</ErrorMessage>
  // ) : undefined;

  // const { onChange, ...restField } = field;

  const Orientation = orientation === 'horizontal' ? Group : Stack;

  return (
    <Switch.Group
      id={formField.name}
      label={formField.label}
      // error={error}
      // onChange={(value) => {
      //   onChange(value ?? defaultValues?.[name]);
      // }}
      {...rest}
      // {...restField}
    >
      {/* eslint-disable @typescript-eslint/no-shadow */}
      <Orientation mt="xs">
        {/* {options.map((option: SelectItem, index: number) => {
          const { label, value, ...rest } = option;
          return <Switch key={`${label}-${index}`} value={value} label={label} {...rest} />;
        })} */}
      </Orientation>
    </Switch.Group>
  );
}

export default SwitchGroup;
