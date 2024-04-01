import React from "react";
import { Box, Card, Divider, Text } from "@mantine/core";
import { StaticDataTable } from "../../../../components/datatable/StaticDataTable";
import { maintenanceStatTableData } from "../../../../json/dataTable/stat-formfields/maintenanceStatTableData";
import { DividerStyled } from "../../../../styles/divider/DividerStyled";
import { StatGridSchema, StatsGrid } from "../../../../components/stats/StatsGrid";
import { StaticOption } from "../../../../types/general/data/data-table/form-field-type/formField-types";
import { DataTableDateSwitch } from "../../../../components/datatable/filter/date/DataTableDateSwitch";
import { useCrudSelectors } from "../../../../redux/features/crud/crudSlice";
import { Icons } from "../../../../data/icons/icons";
import { MaintenanceModel } from "../../../../types/models/maintenance-check-type";

const mockData = [
  {
    _id: "Guasto porta",
    title: "Guasto porta",
    cost: "300",
    status: "completed",
    completedAt: "2021-09-01",
    completedBy: "Mario Rossi",
    createdAt: "2021-08-21",
  },
  {
    _id: "Electrical Repair",
    title: "Electrical Repair",
    cost: "450",
    status: "completed",

    completedAt: "2021-09-05",
    completedBy: "Luca Bianchi",
    createdAt: "2021-08-25",
  },
  {
    _id: "Plumbing Issue",
    title: "Plumbing Issue",
    cost: "200",
    status: "completed",

    completedAt: "2021-08-31",
    completedBy: "Giulia Verdi",
    createdAt: "2021-08-19",
  },
  {
    _id: "Roof Maintenance",
    title: "Roof Maintenance",
    cost: "600",
    status: "completed",

    completedAt: "2021-09-03",
    completedBy: "Alessio Giallo",
    createdAt: "2021-08-17",
  },
  {
    _id: "Painting Walls",
    title: "Painting Walls",
    cost: "350",
    status: "in progress",

    completedAt: null,
    completedBy: null,
    createdAt: "2021-08-14",
  },
  {
    _id: "HVAC Repair",
    title: "HVAC Repair",
    cost: "550",
    status: "pending",
    completedAt: null,
    completedBy: null,

    createdAt: "2021-08-10",
  },
];
function calculateStatsGridData(maintenances: MaintenanceModel[]): StatGridSchema[] {
  const incomplete = maintenances.filter((item) => item.status === "incomplete");
  const completed = maintenances.filter((item) => item.status === "completed");
  const inProgress = maintenances.filter((item) => item.status === "inProgress");
  // const invoiced = maintenances.filter((item) => item.status === 'invoiced');
  const statGridData: StatGridSchema[] = [
    {
      title: "Completed",
      value: completed.length,
      unit: "",
      icon: Icons.check,
      iconColor: "success",
      description: "Done for this month",
    },
    {
      title: "In Progress",
      value: inProgress.length,
      unit: "",
      icon: Icons.progressCheck,
      iconColor: "info",
      description: "Started but not completed(this month)",
    },
    {
      title: "Incomplete",
      value: incomplete.length,
      unit: "",
      icon: Icons.clockStop,
      iconColor: "error",
      description: "Not done for this month",
    },
    {
      title: "Total spent",
      value: maintenances.reduce((acc, item) => acc + +item.invoicesTotal, 0),
      unit: "€",
      icon: Icons.receipt,
      iconColor: "warning",
      description: "Total spent for this month",
    },
    // {
    //   title: 'Invoiced',
    //   value: invoiced.length,
    //   unit: '',
    //   icon: Icons.clockStop,
    // },
  ];
  return statGridData;
}

export const DashboardMaintenanceDatatable = () => {
  const { crudDocuments: maintenances } = useCrudSelectors<MaintenanceModel>("maintenances");

  const statGridData = calculateStatsGridData(maintenances);
  return (
    <Card>
      <DataTableDateSwitch />
      <DividerStyled label="Maintenance" />
      <StaticDataTable json={maintenanceStatTableData} data={maintenances} />
      <StatsGrid data={statGridData} />
    </Card>
  );
};
