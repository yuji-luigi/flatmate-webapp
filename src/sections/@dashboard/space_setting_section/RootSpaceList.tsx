import { AxiosError } from 'axios';
import React from 'react';
import useAuth from '../../../../hooks/useAuth';
import { CardArticleVerticalTextBottom } from '../../../components/card/CardVerticalTextBottom';
import { fetchSpaceSelections } from '../../../pages/choose-root-space';
import useSWR from 'swr';
import { Box, createStyles } from '@mantine/core';
import { PATH_CLIENT } from '../../../path/path-frontend';
import { SpaceModel } from '../../../types/models/space-model';

const useStyles = createStyles((theme) => ({
  pinContainer: {
    // position: 'absolute',
    // width: '100%',
    // left: '50%',
    // transform: 'translateX(-50%)',
    display: 'grid',
    // gridTemplateColumns: 'repeat(auto-fit, minmax(400px, max-content))',
    gridTemplateColumns: 'repeat(auto-fill, 400px)',
    // gridAutoColumns: 'repeat(400px, minmax(400px, 1fr))',
    gridAutoRows: 'minmax(50px, auto)',
    justify-content: 'center',
    gap: 10,
  },
}));

const RootSpaceList = () => {
  const { classes, cx, theme } = useStyles();
  const { user } = useAuth();
  const {
    data: rootSpaces,
    error,
    isLoading,
  } = useSWR<SpaceModel[] | null, AxiosError>(user, fetchSpaceSelections);

  if (!rootSpaces || isLoading) return <p>loading</p>;
  return (
    <Box className={classes.pinContainer} py="xl">
      {rootSpaces.map((space) => (
        <CardArticleVerticalTextBottom
          data={{
            _id: space._id,
            name: space.name,
            address: space.address,
            createdAt: '',
          }}
          href={`${PATH_CLIENT.spaceSettings}/${space._id}`}
          style={{ height: 200, width: 400 }}
          // onClick={() => handleSpaceSelected(rootSpace._id)}
          // // href={`${hrefRoot}/${rootSpace._id}`}
        />
      ))}
    </Box>
  );
};

export default RootSpaceList;
