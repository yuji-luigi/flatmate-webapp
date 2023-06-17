import React from 'react';
import { CardMaintainer, UserCardData } from '../../../components/card/CardMaintainer';
import { Box, createStyles } from '@mantine/core';
import { PATH_IMAGE } from '../../../lib/image-paths';
import { Sections } from '../../../types/general/data/sections-type';
import { useCrudSelectors } from '../../../redux/features/crud/crudSlice';
import useSWR from 'swr';
import { useCookieContext } from '../../../context/CookieContext';
import { current } from '@reduxjs/toolkit';
import { fetchSpaceSelections } from '../../../pages/choose-root-space';
import useAuth from '../../../../hooks/useAuth';
import { Icons } from '../../../data/icons';

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
}));

const MaintainerList = ({ entity }: { entity: Sections }) => {
  const { classes, cx, theme } = useStyles();
  const { user } = useAuth();
  const { crudDocuments } = useCrudSelectors(entity);
  console.log(crudDocuments);
  return (
    <>
      <Box
        className={classes.pinContainer}
        py="xl" /* cols={2} breakpoints={[{ maxWidth: 'sm', cols: 1 }]} */
      >
        {crudDocuments.map((maintainer, i) => {
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
