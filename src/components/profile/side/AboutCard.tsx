import { Card, Title, Text, createStyles, Box } from '@mantine/core';
import { Icon123 } from '@tabler/icons-react';
import React from 'react';
import { Icons } from '../../../data/icons';
import TextWithIcon from '../../text/TextWithIcon';

const useStyles = createStyles((theme) => ({
  card: {
    borderRadius: 12,
  },
  textsContainer: {
    display: 'flex',
    gap: 9,
    flexDirection: 'column',
  },
}));

interface Prop {
  title?: string;
  aboutData: {
    company?: string;
    tel?: string;
    email?: string;
    address?: string;
  };
}
const AboutCard = ({ aboutData, title }: Prop) => {
  const { classes, cx, theme } = useStyles();
  return (
    <Card className={classes.card}>
      {title && <Title mb={8}>{title}</Title>}
      <Box className={classes.textsContainer} sx={{}}>
        {aboutData.company && <TextWithIcon icon={<Icons.buildings />} text={aboutData.company} />}
        {aboutData.address && <TextWithIcon icon={<Icons.mapPin />} text={aboutData.address} />}
        {aboutData.tel && <TextWithIcon icon={<Icons.phoneCall />} text={aboutData.tel} />}
        {aboutData.email && <TextWithIcon icon={<Icons.mail />} text={aboutData.email} />}
      </Box>
    </Card>
  );
};

export default AboutCard;
