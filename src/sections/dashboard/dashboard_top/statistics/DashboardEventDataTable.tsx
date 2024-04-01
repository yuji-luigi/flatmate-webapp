import React from "react";
import { Box, Card, Divider } from "@mantine/core";
import { StaticDataTable } from "../../../../components/datatable/StaticDataTable";
import { maintenanceStatTableData } from "../../../../json/dataTable/stat-formfields/maintenanceStatTableData";
import { DividerStyled } from "../../../../styles/divider/DividerStyled";
import { eventsStatTableData } from "../../../../json/dataTable/stat-formfields/eventsStatTableData";

const mockData = [
  {
    _id: "Ristrutturazione impianto elettrico",
    title: "Ristrutturazione impianto elettrico",
    description: "Ristrutturazione impianto elettrico.....",
    isMaintenance: "manutenzione",
    status: "ongoing",
    fromDate: "2021-08-01",
    toDate: "2021-08-21",
  },
  {
    _id: "BBQ Party",
    title: "BBQ Party",
    description: "Facciamo una bella grigliata tutti insieme...",
    isMaintenance: "",
    status: "confirmed",
    fromDate: "2021-10-01",
    toDate: "2021-10-01",
  },
  {
    _id: "Plumbing Repair",
    title: "Plumbing Repair",
    description: "Riparazione impianto idraulico...",
    isMaintenance: "manutenzione",
    status: "scheduled",
    fromDate: "2021-09-15",
    toDate: "2021-09-16",
  },
  {
    _id: "Community Meeting",
    title: "Community Meeting",
    description: "Incontro della comunità...",
    isMaintenance: "",
    status: "confirmed",
    fromDate: "2021-09-10",
    toDate: "2021-09-10",
  },
  {
    _id: "Roof Inspection",
    title: "Roof Inspection",
    description: "Ispezione del tetto...",
    isMaintenance: "manutenzione",
    status: "scheduled",
    fromDate: "2021-09-25",
    toDate: "2021-09-25",
  },
  {
    _id: "Gardening Workshop",
    title: "Gardening Workshop",
    description: "Workshop di giardinaggio...",
    isMaintenance: "",
    status: "confirmed",
    fromDate: "2021-10-05",
    toDate: "2021-10-05",
  },
  // {
  //_id title: 'Elevator Maintenance',
  //   title: 'Elevator Maintenance',
  //   description: 'Manutenzione dell\'ascensore...',
  //   isMaintenance: 'manutenzione',
  //   status: 'ongoing',
  //   fromDate: '2021-08-05',
  //   toDate: '2021-08-10',
  // },
  // {
  //_id title: 'Community Clean-Up',
  //   title: 'Community Clean-Up',
  //   description: 'Pulizia della comunità...',
  //   isMaintenance: '',
  //   status: 'confirmed',
  //   fromDate: '2021-09-12',
  //   toDate: '2021-09-12',
  // },
  // {
  //_id title: 'Swimming Pool Maintenance',
  //   title: 'Swimming Pool Maintenance',
  //   description: 'Manutenzione della piscina...',
  //   isMaintenance: 'manutenzione',
  //   status: 'scheduled',
  //   fromDate: '2021-08-15',
  //   toDate: '2021-08-16',
  // },
  // {
  //_id title: 'Movie Night',
  //   title: 'Movie Night',
  //   description: 'Serata cinematografica...',
  //   isMaintenance: '',
  //   status: 'confirmed',
  //   fromDate: '2021-10-08',
  //   toDate: '2021-10-08',
  // },
  // {
  //_id title: 'Security System Upgrade',
  //   title: 'Security System Upgrade',
  //   description: 'Aggiornamento del sistema di sicurezza...',
  //   isMaintenance: 'manutenzione',
  //   status: 'ongoing',
  //   fromDate: '2021-08-18',
  //   toDate: '2021-08-23',
  // },
  // {
  //_id title: 'Painting Workshop',
  //   title: 'Painting Workshop',
  //   description: 'Workshop di pittura...',
  //   isMaintenance: '',
  //   status: 'confirmed',
  //   fromDate: '2021-10-12',
  //   toDate: '2021-10-12',
  // },
  // {
  //_id title: 'Heating System Repair',
  //   title: 'Heating System Repair',
  //   description: 'Riparazione del sistema di riscaldamento...',
  //   isMaintenance: 'manutenzione',
  //   status: 'scheduled',
  //   fromDate: '2021-09-20',
  //   toDate: '2021-09-21',
  // },
  // {
  //_id title: 'Fitness Class',
  //   title: 'Fitness Class',
  //   description: 'Classe di fitness...',
  //   isMaintenance: '',
  //   status: 'confirmed',
  //   fromDate: '2021-10-15',
  //   toDate: '2021-10-15',
  // },
  // {
  //_id title: 'Building Inspection',
  //   title: 'Building Inspection',
  //   description: 'Ispezione dell\'edificio...',
  //   isMaintenance: 'manutenzione',
  //   status: 'ongoing',
  //   fromDate: '2021-08-28',
  //   toDate: '2021-08-30',
  // },
];

export const EventDataTable = () => {
  return (
    <Card>
      <DividerStyled label="Lavori/Eventi" />
      <StaticDataTable json={eventsStatTableData} data={mockData} />
    </Card>
  );
};
