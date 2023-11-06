import React from 'react';
import { Group, Stack, Text } from '@mantine/core';
import { useCrudSelectors } from '../../../../redux/features/crud/crudSlice';

import PostFeedCard from '../../../../components/posts/feed/PostFeedCard';
import { StaticDataTable } from '../../../../components/datatable/StaticDataTable';
import { maintenancesTableData } from '../../../../../json/dataTable/formfields/maintenancesTableData';
import { Icons } from '../../../../data/icons/icons';
import { DashboardTopHeader } from '../components/DashboardTopHeader';
import { FeedTableSwitch } from './compontents/FeedTableSwitch';
import { useSegmentedControl } from '../../../../components/tab/useSegmentedControl';
import { filterList } from '../../../../components/datatable/filter/logic/applyFilter';
import { useFilter } from '../../../../../hooks/useFilter';
import useTable, { getComparator } from '../../../../../hooks/useTable';
import { MaintenanceModel } from '../../../../types/models/maintenance-check-type';

export const SpaceMaintenanceSection = () => {
  const { crudDocuments } = useCrudSelectors<MaintenanceModel>('maintenances');
  const { currentValue } = useSegmentedControl();
  const { filters } = useFilter();
  const { order, orderBy } = useTable({
    defaultOrderBy: 'createdAt',
    // defaultDense: true,
    // defaultRowsPerPage: 10,
  });
  const filteredList = filterList({
    list: crudDocuments,
    filters,
    formFields: maintenancesTableData,
    comparator: getComparator(order, orderBy),
  });
  return (
    <>
      <Stack gap={16}>
        <DashboardTopHeader header="Maintenances" rightSection={<FeedTableSwitch />} />
        {currentValue === 'table' && (
          <StaticDataTable json={maintenancesTableData} data={filteredList} withFilter />
        )}
        {currentValue === 'posts' &&
          filteredList.map((maintenance) => (
            <PostFeedCard key={maintenance._id} data={maintenance} />
          ))}
      </Stack>
    </>
  );
};
