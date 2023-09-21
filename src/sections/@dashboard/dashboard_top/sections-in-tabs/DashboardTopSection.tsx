import { Box } from '@mantine/core';
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
import { CrudDataTable } from '../../../../components/datatable/CrudDataTable';
import { MaintenanceDatatable } from '../statistics/MaintenanceDatatable';
import { EventDataTable } from '../statistics/EventDataTable';
import { StatGridSchema, StatsGrid } from '../../../../components/stats/StatsGrid';
import statsGridData from '../../../../../json/mock/statsGrid.json';

const StackedAreaChart = dynamic(() => import('../statistics/StackedAreaChart'), {
  ssr: false, // This will load the component only on the client side.
});
// import { ResponsiveLine } from '@nivo/line';
// import StackedAreaChart from '../statistics/StacjedAreaChart';

const DashboardSection = () => {
  // return <Box>DashboardSection</Box>;
  // return <StackedAreaChart />;
  return (
    <>
      <StatsGrid data={statsGridData as unknown as StatGridSchema[]} />
      <Box sx={{ height: 400, width: '100%', overflow: 'visible' }}>
        <StackedAreaChart />
      </Box>
      <MaintenanceDatatable />
      <EventDataTable />
    </>
  );
};

export default DashboardSection;
