//useSWR allows the use of SWR inside function components

import { Box } from '@mantine/core';
//Write a fetcher function to wrap the native fetch function and return the result of a call to url in json format
import MaintenanceList from './MaintenanceList';
import { useCrudSelectors } from '../../../../redux/features/crud/crudSlice';
import { MaintenanceModel } from '../../../../types/models/maintenance-model';
import classes from './MaintenanceListPageSection.module.css';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

interface TypeMock {
  title: string;
  description: string;
  date: string;
  image?: undefined;
  user?: undefined;
}

interface mock2 {
  image: string;
  avatar: string;
  name: string;
  description: string;
  job: string;
  stats: {
    value: string;
    label: string;
  }[];
  user: string;
}

export default function MaintenanceListPageSection() {
  const { crudDocuments: maintenances } = useCrudSelectors<MaintenanceModel>('maintenances');
  return (
    // <Container mx="auto" py="xl">
    <Box
      className={classes.pinContainer}
      py="xl" /* cols={2} breakpoints={[{ max-width: 'sm', cols: 1 }]} */
    >
      {/* todo create Cards component where differentiate card by thread.type */}
      {maintenances.map((maintenance) => (
        <MaintenanceList key={maintenance._id} maintenance={maintenance} />
      ))}
    </Box>
    // </Container>
  );
}
