import React from 'react';
import { Box, Card, Divider, Text } from '@mantine/core';
import { StaticDataTable } from '../../../../components/datatable/StaticDataTable';
import { maintenanceStatTableData } from '../../../../../json/dataTable/stat-formfields/maintenanceStatTableData';
import { DividerStyled } from '../../../../styles/divider/DividerStyled';
import { StatGridSchema, StatsGrid } from '../../../../components/stats/StatsGrid';
import { StaticOption } from '../../../../types/general/data/data-table/formField-types';
import { DataTableDateSwitch } from '../../../../components/datatable/filter/date/DataTableDateSwitch';

const mockData = [
  {
    _id: 'Guasto porta',
    title: 'Guasto porta',
    cost: '300',
    status: 'completed',
    completedAt: '2021-09-01',
    completedBy: 'Mario Rossi',
    createdAt: '2021-08-21',
  },
  {
    _id: 'Electrical Repair',
    title: 'Electrical Repair',
    cost: '450',
    status: 'completed',

    completedAt: '2021-09-05',
    completedBy: 'Luca Bianchi',
    createdAt: '2021-08-25',
  },
  {
    _id: 'Plumbing Issue',
    title: 'Plumbing Issue',
    cost: '200',
    status: 'completed',

    completedAt: '2021-08-31',
    completedBy: 'Giulia Verdi',
    createdAt: '2021-08-19',
  },
  {
    _id: 'Roof Maintenance',
    title: 'Roof Maintenance',
    cost: '600',
    status: 'completed',

    completedAt: '2021-09-03',
    completedBy: 'Alessio Giallo',
    createdAt: '2021-08-17',
  },
  {
    _id: 'Painting Walls',
    title: 'Painting Walls',
    cost: '350',
    status: 'in progress',

    completedAt: null,
    completedBy: null,
    createdAt: '2021-08-14',
  },
  {
    _id: 'HVAC Repair',
    title: 'HVAC Repair',
    cost: '550',
    status: 'pending',
    completedAt: null,
    completedBy: null,

    createdAt: '2021-08-10',
  },
  // {
  //   _id: 'Window Replacement',
  //   title: 'Window Replacement',
  //   cost: '700',
  //   status: 'completato',
  //   completedAt: '2021-09-02',
  //   completedBy: 'Laura Neri',
  //   createdAt: '2021-08-08',
  // },
  // {
  //   _id: 'Flooring Upgrade',
  //   title: 'Flooring Upgrade',
  //   cost: '400',
  //   status: 'completato',
  //   completedAt: '2021-09-04',
  //   completedBy: 'Marco Blu',
  //   createdAt: '2021-08-05',
  // },
  // {
  //   _id: 'Appliance Repair',
  //   title: 'Appliance Repair',
  //   cost: '250',
  //   status: 'in corso',
  //   completedAt: null,
  //   completedBy: null,
  //   createdAt: '2021-08-02',
  // },
  // {
  //   _id: 'Garden Maintenance',
  //   title: 'Garden Maintenance',
  //   cost: '300',
  //   status: 'in corso',
  //   completedAt: null,
  //   completedBy: null,
  //   createdAt: '2021-07-30',
  // },
  // {
  //   _id: 'Security System Installation',
  //   title: 'Security System Installation',
  //   cost: '800',
  //   status: 'completato',
  //   completedAt: '2021-08-28',
  //   completedBy: 'Elena Rosa',
  //   createdAt: '2021-07-27',
  // },
  // {
  //   _id: 'Carpentry Work',
  //   title: 'Carpentry Work',
  //   cost: '350',
  //   status: 'in corso',
  //   completedAt: null,
  //   completedBy: null,
  //   createdAt: '2021-07-24',
  // },
  // {
  //   _id: 'Bathroom Remodeling',
  //   title: 'Bathroom Remodeling',
  //   cost: '600',
  //   status: 'completato',
  //   completedAt: '2021-08-30',
  //   completedBy: 'Francesco Verde',
  //   createdAt: '2021-07-21',
  // },
  // {
  //   _id: 'Pest Control',
  //   title: 'Pest Control',
  //   cost: '200',
  //   status: 'completato',
  //   completedAt: '2021-08-27',
  //   completedBy: 'Giovanni Giallo',
  //   createdAt: '2021-07-18',
  // },
  // {
  //   _id: 'Exterior Painting',
  //   title: 'Exterior Painting',
  //   cost: '450',
  //   status: 'in corso',
  //   completedAt: null,
  //   completedBy: null,
  //   createdAt: '2021-07-15',
  // },
];
const options: StaticOption[] = maintenanceStatTableData.find(
  (item) => item.name === 'status'
)?.options;

const calculatedStatsGridData = mockData.reduce<StatGridSchema[]>((acc, stat) => {
  const option = options?.find((item) => item.value === stat.status);
  const status = option?.value;
  const icon = option?.icon;
  if (stat.status === status) {
    const existingField = acc.find((item: any) => item.title === status);
    if (existingField) {
      existingField.value += +stat.cost;
      return acc;
    }
    acc.push({
      title: status,
      value: +stat.cost,
      unit: '€',
      icon,
    });
    return acc;
  }
  return acc;
}, []);

export const MaintenanceDatatable = () => {
  return (
    <Card style={{ zIndex: 1 }}>
      <DataTableDateSwitch />
      <DividerStyled label="Maintenance" />
      <StaticDataTable json={maintenanceStatTableData} data={mockData} />
      <StatsGrid data={calculatedStatsGridData} />
    </Card>
  );
};
