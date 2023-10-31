import { Card, Group } from '@mantine/core';
import React from 'react';
import dynamic from 'next/dynamic';
import { MonthPickerInput } from '@mantine/dates';
import { CustomLayer } from '@nivo/line';
import { useCrudSelectors } from '../../../../../../redux/features/crud/crudSlice';
import { intlDateFormatMonth } from '../../../../../../utils/helpers/date-formatters';
import { Icons } from '../../../../../../data/icons/icons';
import { LabelLayerCustom } from '../../../../../../components/chart/custom-layer/LabelLayerCustom';
import { LabelLayer } from '../../../../../../components/chart/custom-layer/CustomLayer';
import { FromToDateQueryInputs } from '../../../../../../components/input/filter-inputs/FromToDateQueryInputs';

const StackedAreaChart = dynamic(
  () => import('../../../../../../components/chart/line-area-chart/StackedAreaChart'),
  {
    ssr: false, // This will load the component only on the client side.
  }
);
export const ChecksByMonthChart = () => {
  const { crudDocument: statistics } = useCrudSelectors<Statistics>('statistics');
  const { checksByMonth } = statistics || {};
  if (!checksByMonth) return null;
  const mData = checksByMonth.map((statistic) => {
    return {
      x: intlDateFormatMonth(statistic.month),
      y: statistic.total || 0,
      change: statistic.total || 0,
    };
  });
  const handleQueryByDate = (values: { [key: string]: null | Date }) => {
    console.log(values);
  };

  return (
    <Card>
      <FromToDateQueryInputs
        fromName="from"
        toName="to"
        endpoint=""
        onChangeCallback={handleQueryByDate}
      />
      <StackedAreaChart
        //@ts-ignore
        customLayer={LabelLayer}
        statistics={[{ id: 'this', data: mData }]}
      />
    </Card>
  );
};
