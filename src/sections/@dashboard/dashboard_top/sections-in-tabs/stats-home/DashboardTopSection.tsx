import { Box, Card, Grid, Text } from '@mantine/core';

import dynamic from 'next/dynamic';
import { MaintenanceDatatable } from '../../statistics/MaintenanceDatatable';
import { EventDataTable } from '../../statistics/EventDataTable';
import { StatGridSchema, StatsGrid } from '../../../../../components/stats/StatsGrid';
import statsGridData from '../../../../../../json/mock/statsGrid.json';
import classes from './DashboardTopSection.module.css';
import { StatsSummary } from './StatsSummary';

const StackedAreaChart = dynamic(
  () => import('../../../../../components/chart/line-area-chart/StackedAreaChart'),
  {
    ssr: false, // This will load the component only on the client side.
  }
);

const DashboardSection = () => {
  return (
    <Box className={classes.box}>
      <Text component="h1" size="lg">
        Dashboard
      </Text>
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
