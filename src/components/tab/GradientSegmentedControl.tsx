import { SegmentedControl, SegmentedControlItem } from '@mantine/core';
import { useState } from 'react';
import classes from './GradientSegmentedControl.module.css';

type Props = {
  data: string[] | SegmentedControlItem[];
};
export function GradientSegmentedControl(props: Props) {
  const { data } = props;
  const [query, setQuery] = useState<string>('this-month');
  const handleChange = (value: string) => {
    setQuery(value);
    if (value === 'Advanced') {
      console.log('open date picker and set advanced date range');
      // then call api to get data
    }
  };
  return (
    <SegmentedControl
      radius="xl"
      size="md"
      onChange={handleChange}
      data={data}
      classNames={classes}
    />
  );
}
