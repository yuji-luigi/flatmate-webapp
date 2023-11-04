import { Box, Button, Text } from '@mantine/core';
import Link from 'next/link';
import React, { useEffect } from 'react';
import { NextRouter, useRouter } from 'next/router';
import {
  CardArticleVerticalTextBottom,
  CardData,
} from '../../../components/card/CardVerticalTextBottom';
import { PATH_CLIENT } from '../../../path/path-frontend';
import classes2 from '../../../styles/global-useStyles.module.css';
import { SpaceModel } from '../../../types/models/space-model';
import axiosInstance from '../../../utils/axios-instance';
import { PATH_API } from '../../../path/path-api';
import { ParsedQueryCustom } from '../../../types/nextjs-custom-types/useRouter-types';
import useAuth from '../../../../hooks/useAuth';
import classes from './ChooseSpaceSection.module.css';

export const ChooseSpaceSection = ({ spaces }: { spaces: SpaceModel[] }) => {
  const { user } = useAuth();

  const router: NextRouter & { query: ParsedQueryCustom; pathname: string } = useRouter();

  const handleSpaceSelected = async (spaceId: string) => {
    await axiosInstance.get(`${PATH_API.spaceCookie}/${spaceId}`);
    router.push(PATH_CLIENT.root);
  };

  if (!user) return null;
  return (
    <Box className={classes2.container}>
      {user.role === 'super_admin' && (
        <Box>
          <Button component={Link} href={PATH_CLIENT.chooseOrganization} variant="outline">
            Back
          </Button>
        </Box>
      )}
      <Text variant="text" fz={36} fw={600} ta="center">
        Choose a space
      </Text>
      <Box
        className={classes.pinContainer}
        py="xl" /* cols={2} breakpoints={[{ max-width: 'sm', cols: 1 }]} */
      >
        {spaces.map((rootSpace) => (
          <CardArticleVerticalTextBottom
            key={rootSpace._id}
            data={rootSpace as CardData}
            onClick={() => handleSpaceSelected(rootSpace._id)}
          />
        ))}
      </Box>
    </Box>
  );
};
