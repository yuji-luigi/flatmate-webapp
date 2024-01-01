import { Box, Card } from '@mantine/core';
import React from 'react';
import classes from './ProfileSide.module.css';

interface Props {
  contents: React.ReactNode;
}

const ProfileSide = ({ contents }: Props) => {
  return (
    <Box className={classes.sideBox} style={{ height: '100%' }}>
      {contents}
    </Box>
  );
};

export default ProfileSide;
