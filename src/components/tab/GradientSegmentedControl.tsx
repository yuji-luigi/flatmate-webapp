import { SegmentedControl, SegmentedControlItem } from '@mantine/core';
import { useEffect, useState } from 'react';
import { useLocalStorage } from '@mantine/hooks';
import classes from './GradientSegmentedControl.module.css';
import { useSegmentedControl } from './useSegmentedControl';

type Props = {
  switchDataList: SegmentedControlItem[];
  localStorageKey?: string;
};
export function GradientSegmentedControl(props: Props) {
  const { switchDataList, localStorageKey } = props;
  const { setCurrentValue, currentValue } = useSegmentedControl();
  const [storageValue, setStorageValue] = useLocalStorage({ key: localStorageKey || '' });
  const handleChange = (value: string) => {
    setCurrentValue(value);
    console.log('value', value);
    if (localStorageKey) {
      setStorageValue(value);
    }
  };
  useEffect(() => {
    if (!storageValue) {
      // the default value is the first item
      setCurrentValue(switchDataList[0].value);
    }
  }, [storageValue]);
  return (
    <SegmentedControl
      radius="xl"
      size="xs"
      onChange={handleChange}
      data={switchDataList}
      value={currentValue}
      classNames={classes}
    />
  );
}
