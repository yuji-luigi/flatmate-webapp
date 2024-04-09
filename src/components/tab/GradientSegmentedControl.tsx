import { SegmentedControl, SegmentedControlItem } from "@mantine/core";
import { useEffect, useState } from "react";
import { useLocalStorage } from "@mantine/hooks";
import classes from "./GradientSegmentedControl.module.css";
import { useSegmentedControl } from "./useSegmentedControl";
import { useLocale } from "../../../hooks/useLocale";

type Props = {
  switchDataList: SegmentedControlItem[];
  localStorageKey?: string;
};
export function GradientSegmentedControl(props: Props) {
  const { switchDataList, localStorageKey } = props;
  const { t } = useLocale("common");
  const _switchDataList = switchDataList.map((item) => ({
    ...item,
    label: typeof item.label === "string" ? t(item.label) : item.label,
  }));
  const { setCurrentValue, currentValue } = useSegmentedControl();
  const [storageValue, setStorageValue] = useLocalStorage({ key: localStorageKey || "" });
  const handleChange = (value: string) => {
    setCurrentValue(value);
    if (localStorageKey) {
      setStorageValue(value);
    }
  };
  useEffect(() => {
    if (!storageValue) {
      // the default value is the first item
      setCurrentValue(switchDataList[0].value);
      return;
    }
    const v = localStorage.getItem(localStorageKey || "") || "";
    if (v) {
      setCurrentValue(JSON.parse(v));
    }
  }, [storageValue]);
  return (
    <SegmentedControl
      radius="xl"
      size="xs"
      onChange={handleChange}
      data={_switchDataList}
      value={currentValue}
      classNames={classes}
    />
  );
}
