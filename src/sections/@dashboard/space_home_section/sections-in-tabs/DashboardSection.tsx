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

const StackedAreaChart = dynamic(() => import('../statistics/StacjedAreaChart'), {
  ssr: false, // This will load the component only on the client side.
});
// import { ResponsiveLine } from '@nivo/line';
// import StackedAreaChart from '../statistics/StacjedAreaChart';

const DashboardSection = () => {
  // return <Box>DashboardSection</Box>;
  // return <StackedAreaChart />;
  return (
    <Box sx={{ height: 400, width: '100%', overflow: 'visible' }}>
      <StackedAreaChart />
      {/* <ResponsiveLine
        data={[
          {
            id: 'japan',
            color: 'hsl(215, 70%, 50%)',
            data: [
              {
                x: 49,
                y: 130,
              },
            ],
          },
          {
            id: 'am',
            color: 'red',
            data: [
              {
                x: 99,
                y: 10,
              },
            ],
          },
        ]}
        theme={{
          background: 'white',
          axis: {
            domain: {
              line: {
                stroke: '#777777',
                strokeWidth: 1,
              },
            },
            ticks: {
              line: {
                stroke: '#777777',
                strokeWidth: 0.5,
              },
            },
          },
          grid: {
            line: {
              stroke: '#dddddd',
              strokeWidth: 0.5,
            },
          },
        }}
        // ... other props
      /> */}
    </Box>
    // <ResponsiveContainer width="100%" height="100%">
    //   <AreaChart
    //     width={500}
    //     height={400}
    //     data={data}
    //     margin={{
    //       top: 10,
    //       right: 30,
    //       left: 0,
    //       bottom: 0,
    //     }}
    //   >
    //     <CartesianGrid strokeDasharray="3 3" />
    //     <XAxis dataKey="name" />
    //     <YAxis />
    //     <Tooltip />
    //     <Area type="monotone" dataKey="uv" stackId="1" stroke="#8884d8" fill="#8884d8" />
    //     <Area type="monotone" dataKey="pv" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
    //     <Area type="monotone" dataKey="amt" stackId="1" stroke="#ffc658" fill="#ffc658" />
    //   </AreaChart>
    // </ResponsiveContainer>
  );
};

export default DashboardSection;
