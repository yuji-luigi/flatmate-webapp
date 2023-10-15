import { Box, Button, Text, createStyles } from '@mantine/core';
import Link from 'next/link';
import React from 'react';
import { NextRouter, useRouter } from 'next/router';
import {
  CardArticleVerticalTextBottom,
  CardData,
} from '../../../components/card/CardVerticalTextBottom';
import { PATH_CLIENT } from '../../../path/path-frontend';
import { profilePageStyle } from '../../../styles/global-useStyles';
import { SpaceModel } from '../../../types/models/space-model';
import axiosInstance from '../../../utils/axios-instance';
import { PATH_API } from '../../../path/path-api';
import { ParsedQueryCustom } from '../../../types/nextjs-custom-types/useRouter-types';
import useAuth from '../../../../hooks/useAuth';

const useStyles = createStyles((theme) => ({
  pinContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, 400px)',
    gridAutoRows: 'minmax(50px, auto)',
    justifyContent: 'center',
    gap: 10,
    @media (max-width: 768px): {
      display: 'flex',
      flex-direction: 'column',
      justifyContent: 'center',
      align-items: 'center',
      width: '100%',
    },
  },
}));
export const ChooseSpaceSection = ({ spaces }: { spaces: SpaceModel[] }) => {
  const { classes, cx, theme } = useStyles();
  const { classes: classes2 } = profilePageStyle();

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
      <Text variant="text" size={36} weight={600} align="center">
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
