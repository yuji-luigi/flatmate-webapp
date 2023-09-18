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

const StackedAreaChart = dynamic(() => import('../statistics/StacjedAreaChart'), {
  ssr: false, // This will load the component only on the client side.
});
// import { ResponsiveLine } from '@nivo/line';
// import StackedAreaChart from '../statistics/StacjedAreaChart';

const DashboardSection = () => {
  // return <Box>DashboardSection</Box>;
  // return <StackedAreaChart />;
  return (
    <>
      <Box sx={{ height: 400, width: '100%', overflow: 'visible' }}>
        <StackedAreaChart />
      </Box>
      <Box sx={{ height: 400, width: '100%', overflow: 'visible' }}>
        <CrudDataTable overridingEntity="maintainers" />
      </Box>
      <Box sx={{ height: 400, width: '100%', overflow: 'visible' }}>
        <CrudDataTable overridingEntity="threads" />
      </Box>
    </>
  );
};

export default DashboardSection;
