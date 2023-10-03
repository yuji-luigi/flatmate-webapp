import React from 'react';
import { Box, createStyles } from '@mantine/core';
import useSWR from 'swr';
import { current } from '@reduxjs/toolkit';
import { CardMaintainer, UserCardData } from '../../../components/card/CardMaintainer';
import { PATH_IMAGE } from '../../../lib/image-paths';
import { Sections } from '../../../types/general/data/sections-type';
import { useCrudSelectors } from '../../../redux/features/crud/crudSlice';
import { useCookieContext } from '../../../context/CookieContext';
import { fetchSpaceSelections } from '../../../pages/choose-root-space';
import useAuth from '../../../../hooks/useAuth';
import { Icons } from '../../../data/icons/icons';
import { QueryFilterToApi } from '../../../components/datatable/filter/QueryFilterToApi';
import { maintainersTableData } from '../../../../json/dataTable/formfields/maintainersTableData';
import { QueryFilterWeb } from '../../../components/datatable/filter/QueryFilterWeb';
import { filterList } from '../../../components/datatable/filter/logic/applyFilter';
import useTable, { getComparator } from '../../../../hooks/useTable';
import { useFilter } from '../../../../hooks/useFilter';
import { SpaceModel } from '../../../types/models/space-model';

/**
 * 1. fetch all the maintainers from database with redux.
 * 2. display all the maintainers in a card grid.
 * 3. has filter and search bar.
 *
 * card has
 * 1. avatar
 * 2. name
 * 3. company name
 * 4. email
 * 5. phone
 * 6. address
 *
 *
 *
 * @returns
 */

const useStyles = createStyles((theme) => ({
  pinContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, 300px)',
    gridAutoRows: 'minmax(50px, auto)',
    justifyContent: 'center',
    gap: 24,
  },
  QueryFilterToApi: {
    gridColumn: '1 / -1', // This makes it span across all columns.
    // height: 'px', // Or you can use 'min-content', 'max-content' or any other valid value.
  },
}));

const MaintainerList = ({ entity }: { entity: Sections }) => {
  const { classes, cx, theme } = useStyles();
  const { user } = useAuth();
  const { crudDocuments } = useCrudSelectors(entity);
  const { filters } = useFilter();
  const { order, orderBy } = useTable({
    defaultOrderBy: 'createDate',
    // defaultDense: true,
    // defaultRowsPerPage: 10,
  });

  const filteredList = filterList({
    list: crudDocuments,
    filters,
    formFields: maintainersTableData,
    comparator: getComparator(order, orderBy),
  });

  return (
    <>
      <Box
        className={classes.pinContainer}
        /* cols={2} breakpoints={[{ maxWidth: 'sm', cols: 1 }]} */
      >
        {/* <QueryFilterWeb
          entity={entity}
          className={classes.QueryFilterToApi}
          formFields={maintainersTableData}
        /> */}
        {filteredList.map((maintainer, i) => {
          let badge = maintainer.spaces
            .filter((space: SpaceModel) => space.organization?._id === user?.organization)
            .map((space: SpaceModel) => space.name);
          badge = badge.length > 0 ? badge : ['Not assigned to any space'];
          return (
            <CardMaintainer
              entity={entity}
              data={{
                _id: maintainer._id,
                name: maintainer.name,
                // email: maintainer.email,
                // address: maintainer.address,
                company: maintainer.company,
                slug: maintainer.slug,
                // badgeIcon: <Icons.check />,
                badges: badge,
                badgeSx: { paddingBlock: 8, maxWidth: 100 },
                avatar: maintainer.avatar,
                cover: maintainer.cover,
                type: maintainer.type,
              }}
              key={maintainer._id}
            />
          );
        })}
      </Box>
    </>
  );
};
export default MaintainerList;
