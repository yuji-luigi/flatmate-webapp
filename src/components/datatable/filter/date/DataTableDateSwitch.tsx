import { Box, Button, Group, SegmentedControlItem } from "@mantine/core";
import React from "react";
import { useTranslation } from "next-i18next";
import { GradientSegmentedControl } from "../../../tab/GradientSegmentedControl";
import { SegmentedControlContextProvider } from "../../../tab/useSegmentedControl";

export const DataTableDateSwitch = () => {
  const { t } = useTranslation("common");
  const _data: SegmentedControlItem[] = [
    {
      value: "this-month",
      label: "This month",
    },
    {
      value: "three-month",
      label: "3 months",
    },
    {
      value: "six-months",
      label: "6 months",
    },
    {
      value: "12-months",
      label: "Year",
    },
    {
      value: "Advanced",
      label: "Advanced",
    },
  ];
  return (
    <Box style={{ textAlign: "right" }}>
      <SegmentedControlContextProvider>
        <GradientSegmentedControl switchDataList={_data} />
      </SegmentedControlContextProvider>
    </Box>
  );
};
