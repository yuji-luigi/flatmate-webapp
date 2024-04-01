import { Box, Card, Grid, Text } from "@mantine/core";

import dynamic from "next/dynamic";
import { DashboardMaintenanceDatatable } from "../../../../sections/dashboard/dashboard_top/statistics/DashboardMaintenanceDatatable";
import { EventDataTable } from "../../../../sections/dashboard/dashboard_top/statistics/DashboardEventDataTable";
import { StatGridSchema, StatsGrid } from "../../../../components/stats/StatsGrid";
import statsGridData from "../../../../json/mock/statsGrid.json";
import classes from "./DashboardTopSection.module.css";
import { StatsSummary } from "./StatsSummary";
import { DashboardTopHeader } from "../../../../sections/dashboard/dashboard_top/components/DashboardTopHeader";
import { useCookieContext } from "../../../../context/CookieContext";
import { ChecksByMonthChart } from "./components/ChecksByMonthChart";

const DashboardSection = () => {
  const { currentSpace } = useCookieContext();

  return (
    <Box className={classes.box}>
      <DashboardTopHeader header={currentSpace?.name} subHeader={currentSpace?.address} />
      <StatsSummary className={classes.summary} />
      <StatsGrid data={statsGridData as unknown as StatGridSchema[]} />
      <ChecksByMonthChart />
      <DashboardMaintenanceDatatable />
      <EventDataTable />
    </Box>
  );
};

export default DashboardSection;
