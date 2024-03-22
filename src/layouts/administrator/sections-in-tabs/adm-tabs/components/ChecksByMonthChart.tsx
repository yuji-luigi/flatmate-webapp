import { Box, Card, Group } from "@mantine/core";
import React from "react";
import dynamic from "next/dynamic";
import { MonthPickerInput } from "@mantine/dates";
import { CustomLayer } from "@nivo/line";
import { useCrudSelectors, useCrudSliceStore } from "../../../../../redux/features/crud/crudSlice";
import { intlDateFormatMonth } from "../../../../../utils/helpers/date-formatters";
import { Icons } from "../../../../../data/icons/icons";
import { LabelLayerCustom } from "../../../../../components/chart/custom-layer/LabelLayerCustom";
import { LabelLayer } from "../../../../../components/chart/custom-layer/CustomLayer";
import { FromToDateQueryInputs } from "../../../../../components/input/filter-inputs/FromToDateQueryInputs";
import axiosInstance from "../../../../../utils/axios-instance";
import { _PATH_API } from "../../../../../path/path-api";

const StackedAreaChart = dynamic(
  () => import("../../../../../components/chart/line-area-chart/StackedAreaChart"),
  {
    ssr: false, // This will load the component only on the client side.
  }
);
export const ChecksByMonthChart = () => {
  const { setCrudDocument } = useCrudSliceStore();
  const { crudDocument: statistics } = useCrudSelectors<Statistics>("statistics");
  const { checksByMonth } = statistics || {};
  if (!checksByMonth) return null;
  const mData = checksByMonth.map((statistic) => {
    return {
      x: intlDateFormatMonth(statistic.month),
      y: statistic.total || 0,
      change: statistic.total || 0,
    };
  });
  const handleQueryByDate = async (values: { [key: string]: null | Date }) => {
    const rawRes = await axiosInstance.get(_PATH_API.statistics.byMonth, { params: values });
    setCrudDocument({ entity: "statistics", document: rawRes.data.data });
  };
  const currentDate = new Date();

  // Create a new date object for the current date
  const now = new Date();
  // Use the current date to subtract 6 months for the 'from' date
  const fromDate = new Date(now); // Clone the current date
  fromDate.setMonth(now.getMonth() - 6); // Subtract 6 months
  fromDate.setDate(1); // Set to the first day of the month
  fromDate.setHours(0, 0, 0, 0); // Set to midnight
  // Create a new date object for the 'to' date, which is the first day of the current month at midnight
  const toDate = new Date(now.getFullYear(), now.getMonth(), 1);
  toDate.setHours(0, 0, 0, 0); // Set to midnight
  // Now you have two separate dates:
  // defFrom is the first day of the month, 6 months ago, at 00:00
  const defFrom = fromDate;
  // defTo is the first day of the current month, at 00:00
  const defTo = toDate;

  return (
    <Card>
      <FromToDateQueryInputs
        defaultValues={{
          from: defFrom,
          to: defTo,
        }}
        fromName="from"
        toName="to"
        endpoint=""
        onChangeCallback={handleQueryByDate}
      />
      <Box style={{ overflowX: "scroll", overflowY: "hidden" }}>
        <Box style={{ minWidth: "100%", width: mData.length * 50 }}>
          <StackedAreaChart
            //@ts-ignore
            customLayer={LabelLayer}
            statistics={[{ id: new Date().toISOString(), data: mData }]}
          />
        </Box>
      </Box>
    </Card>
  );
};
