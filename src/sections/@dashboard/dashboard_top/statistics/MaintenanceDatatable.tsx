import React from 'react';
import { Box, Card, Divider, Text } from '@mantine/core';
import { StaticDataTable } from '../../../../components/datatable/StaticDataTable';
import { maintenanceStatTableData } from '../../../../../json/dataTable/stat-formfields/maintenanceStatTableData';
import { DividerStyled } from '../../../../styles/divider/DividerStyled';

const mockData = [
  {
    title: 'Guasto porta',
    cost: '300',
    status: 'completato',
    completedAt: '2021-09-01',
    completedBy: 'Mario Rossi',
    createdAt: '2021-08-21',
  },
  {
    title: 'Electrical Repair',
    cost: '450',
    status: 'completato',
    completedAt: '2021-09-05',
    completedBy: 'Luca Bianchi',
    createdAt: '2021-08-25',
  },
  {
    title: 'Plumbing Issue',
    cost: '200',
    status: 'completato',
    completedAt: '2021-08-31',
    completedBy: 'Giulia Verdi',
    createdAt: '2021-08-19',
  },
  {
    title: 'Roof Maintenance',
    cost: '600',
    status: 'completato',
    completedAt: '2021-09-03',
    completedBy: 'Alessio Giallo',
    createdAt: '2021-08-17',
  },
  {
    title: 'Painting Walls',
    cost: '350',
    status: 'in corso',
    completedAt: null,
    completedBy: null,
    createdAt: '2021-08-14',
  },
  {
    title: 'HVAC Repair',
    cost: '550',
    status: 'in corso',
    completedAt: null,
    completedBy: null,
    createdAt: '2021-08-10',
  },
  // {
  //   title: 'Window Replacement',
  //   cost: '700',
  //   status: 'completato',
  //   completedAt: '2021-09-02',
  //   completedBy: 'Laura Neri',
  //   createdAt: '2021-08-08',
  // },
  // {
  //   title: 'Flooring Upgrade',
  //   cost: '400',
  //   status: 'completato',
  //   completedAt: '2021-09-04',
  //   completedBy: 'Marco Blu',
  //   createdAt: '2021-08-05',
  // },
  // {
  //   title: 'Appliance Repair',
  //   cost: '250',
  //   status: 'in corso',
  //   completedAt: null,
  //   completedBy: null,
  //   createdAt: '2021-08-02',
  // },
  // {
  //   title: 'Garden Maintenance',
  //   cost: '300',
  //   status: 'in corso',
  //   completedAt: null,
  //   completedBy: null,
  //   createdAt: '2021-07-30',
  // },
  // {
  //   title: 'Security System Installation',
  //   cost: '800',
  //   status: 'completato',
  //   completedAt: '2021-08-28',
  //   completedBy: 'Elena Rosa',
  //   createdAt: '2021-07-27',
  // },
  // {
  //   title: 'Carpentry Work',
  //   cost: '350',
  //   status: 'in corso',
  //   completedAt: null,
  //   completedBy: null,
  //   createdAt: '2021-07-24',
  // },
  // {
  //   title: 'Bathroom Remodeling',
  //   cost: '600',
  //   status: 'completato',
  //   completedAt: '2021-08-30',
  //   completedBy: 'Francesco Verde',
  //   createdAt: '2021-07-21',
  // },
  // {
  //   title: 'Pest Control',
  //   cost: '200',
  //   status: 'completato',
  //   completedAt: '2021-08-27',
  //   completedBy: 'Giovanni Giallo',
  //   createdAt: '2021-07-18',
  // },
  // {
  //   title: 'Exterior Painting',
  //   cost: '450',
  //   status: 'in corso',
  //   completedAt: null,
  //   completedBy: null,
  //   createdAt: '2021-07-15',
  // },
];

console.log(mockData);

export const MaintenanceDatatable = () => {
  return (
    <Card mt={36}>
      <DividerStyled label="Maintenance" />
      <StaticDataTable json={maintenanceStatTableData} data={mockData} />
    </Card>
  );
};
