import { AxiosError } from 'axios';
import React from 'react';
import useSWR from 'swr';
import { Box } from '@mantine/core';
import useAuth from '../../../../hooks/useAuth';
import { CardArticleVerticalTextBottom } from '../../../components/card/CardVerticalTextBottom';
import { fetchSpaceSelections } from '../../../pages/choose-root-space';
import { PATH_CLIENT } from '../../../path/path-frontend';
import { SpaceModel } from '../../../types/models/space-model';
import classes from './RootSpaceList.module.css';

const RootSpaceList = () => {
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
          key={space._id}
          data={{
            _id: space._id,
            name: space.name,
            address: space.address,
            createdAt: '',
            cover: space.cover,
          }}
          href={`${PATH_CLIENT.spaceSettings}/${space.slug}`}
          style={{ height: 200, width: 400 }}
          // onClick={() => handleSpaceSelected(rootSpace._id)}
          // // href={`${hrefRoot}/${rootSpace._id}`}
        />
      ))}
    </Box>
  );
};

export default RootSpaceList;
