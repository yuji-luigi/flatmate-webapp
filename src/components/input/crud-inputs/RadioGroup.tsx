import { Group, Radio, Stack } from "@mantine/core";

import { RadioGroupProps } from "../../../types/general/data/data-table";

function RadioGroup(props: RadioGroupProps) {
  const {
    form,
    label,
    name,
    options = [
      { label: "placeholder", value: "placeholder" },
      { label: "placeholder", value: "placeholder" },
    ],
    orientation = "horizontal",
    orientationProps,
    ...rest
  } = props;

  // TODO: fieldError of my own making
  // const error = fieldError ? (
  //   <ErrorMessage>{fieldError.message?.toString()}</ErrorMessage>
  // ) : undefined;

  // const { onChange, ...restField } = field;

  const Orientation = orientation === "horizontal" ? Group : Stack;

  return (
    <Radio.Group
      id={name}
      label={label}
      // error={error}
      // onChange={(value) => {
      //   onChange(value ?? defaultValues?.[name]);
      // }}
      // {...rest}
      // {...restField}
    >
      {/* eslint-disable @typescript-eslint/no-shadow */}
      {/* <Orientation mt="xs" {...orientationProps}>
        {options.map((option: SelectItem, index: number) => {
          const { label, value, ...rest } = option;
          return <Radio key={`${label}-${index}`} value={value} label={label} {...rest} />;
        })}
      </Orientation> */}
    </Radio.Group>
  );
}

export default RadioGroup;
