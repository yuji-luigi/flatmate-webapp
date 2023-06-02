import { Box, Card, createStyles } from '@mantine/core';
import React from 'react';
import AboutCard from './AboutCard';

interface Props {
  aboutData: {
    title?: string;
    email?: string;
    tel?: string;
    company?: string;
    address?: string;
  };
  contents: React.ReactNode;
}

const useStyles = createStyles((theme) => ({
  sideBox: {
    width: '30%',
    gap: 16,
    display: 'flex',
    flexDirection: 'column',
    [theme.fn.smallerThan('md')]: {
      width: '100%', // backgroundColor: theme.cdolors.yellow[6],
    },
    [theme.fn.smallerThan('sm')]: {
      width: '100%', // backgroundColor: theme.cdolors.yellow[6],
      // flexDirection: 'row',
    },
  },
}));
const ProfileSide = ({ aboutData = {}, contents }: Props) => {
  const { cx, classes, theme } = useStyles();

  return (
    <Box className={classes.sideBox}>
      {contents}
      {/* <AboutCard
        title={aboutData.title || ''}
        email={aboutData.email || ''}
        tel={aboutData.tel || ''}
        company={aboutData.company || ''}
        address={aboutData.address || ''}
      /> */}
    </Box>
  );
};

export default ProfileSide;
