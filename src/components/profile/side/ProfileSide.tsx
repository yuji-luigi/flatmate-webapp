import { Box, Card, createStyles } from '@mantine/core';
import React from 'react';
import AboutCard from './AboutCard';

interface Props {
  contents: React.ReactNode;
}

const useStyles = createStyles((theme) => ({
  sideBox: {
    width: '30%',
    gap: 16,
    display: 'flex',
    flex-direction: 'column',
    flex: 1,
     @media (max-width: $mantine-breakpoint-md): {
      width: '100%', // background-color: theme.cdolors.yellow[6],
    },
    @media (max-width: $mantine-breakpoint-sm): {
      width: '100%', // background-color: theme.cdolors.yellow[6],
      // flex-direction: 'row',
    },
  },
}));
const ProfileSide = ({ contents }: Props) => {
  const { cx, classes, theme } = useStyles();

  return (
    <Box className={classes.sideBox} style={{ height: '100%' }}>
      {contents}
    </Box>
  );
};

export default ProfileSide;
