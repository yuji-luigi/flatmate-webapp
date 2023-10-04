import { Box, Card, Grid } from '@mantine/core';
// import React, { PureComponent } from 'react';
// import {
//   AreaChart,
//   Area,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
// } from 'recharts';
import dynamic from 'next/dynamic';
import { CrudDataTable } from '../../../../../components/datatable/CrudDataTable';
import { MaintenanceDatatable } from '../../statistics/MaintenanceDatatable';
import { EventDataTable } from '../../statistics/EventDataTable';
import { StatGridSchema, StatsGrid } from '../../../../../components/stats/StatsGrid';
import statsGridData from '../../../../../../json/mock/statsGrid.json';
import classes from './DashboardTopSection.module.css';
import { StatsSummary } from './StatsSummary';
import { StatsSegments } from '../../../../../components/stats/StatsSegments';

const StackedAreaChart = dynamic(
  () => import('../../../../../components/chart/line-area-chart/StackedAreaChart'),
  {
    ssr: false, // This will load the component only on the client side.
  }
);

const DashboardSection = () => {
  return (
    <Box className={classes.box}>
      <StatsSummary className={classes.summary} />
      <StatsGrid data={statsGridData as unknown as StatGridSchema[]} />
      <Card sx={{ height: 400, width: '100%', overflow: 'visible' }}>
        <StackedAreaChart />
      </Card>
      <MaintenanceDatatable />
      <EventDataTable />
    </Box>
  );
};

export default DashboardSection;
