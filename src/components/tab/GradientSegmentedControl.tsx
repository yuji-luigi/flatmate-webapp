import { SegmentedControl, SegmentedControlItem } from '@mantine/core';
import { useEffect, useState } from 'react';
import classes from './GradientSegmentedControl.module.css';
import { useSegmentedControl } from './useSegmentedControl';

type Props = {
  data: SegmentedControlItem[];
};
export function GradientSegmentedControl(props: Props) {
  const { data } = props;
  const { setCurrentValue } = useSegmentedControl();
  const handleChange = (value: string) => {
    setCurrentValue(value);
  };
  useEffect(() => {
    setCurrentValue(data[0].value);
  }, []);
  // const [query, setQuery] = useState<string>(data[0].value);
  // const handleChange = (value: string) => {
  //   setQuery(value);
  //   if (value === 'Advanced') {
  //     console.log('open date picker and set advanced date range');
  //     // then call api to get data
  //   }
  // };
  return (
    <SegmentedControl
      radius="xl"
      size="xs"
      onChange={handleChange}
      data={data}
      classNames={classes}
    />
  );
}
