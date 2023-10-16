import { useState } from 'react';
import dayjs from 'dayjs';
import { createStyles, UnstyledButton, Text, Paper, Group } from '@mantine/core';
import {
  IconSwimming,
  IconBike,
  IconRun,
  IconChevronDown,
  IconChevronUp,
} from '@tabler/icons-react';

const useStyles = createStyles((theme) => ({
  root: {
    backgroundImage: `linear-gradient(-60deg, ${theme.colors[theme.primaryColor][4]} 0%, ${
      theme.colors[theme.primaryColor][7]
    } 100%)`,
    padding: var(--mantine-spacing-xl),
    border-radius:var( --mantine-radius-md),
    display: 'flex',

    [theme.fn.smallerThan('xs')]: {
      flex-direction: 'column',
    },
  },

  icon: {
    margin-left: 'auto',
    marginRight: 'auto',
    margin-top: var(--mantine-spacing-lg,
    color: theme.colors[theme.primaryColor][6],
  },

  stat: {
    minWidth: 98,
    padding-top: var(--mantine-spacing-xl),
    min-height: 140,
    display: 'flex',
    flex: 1,
    flex-direction: 'column',
    justify-content: 'space-between',
    background-color: theme.white,
  },

  label: {
    textTransform: 'uppercase',
    font-weight: 700,
    font-size: theme.fontSizes.xs,
    font-family: Greycliff CF, var(--mantine-font-family),
    color: theme.colors.gray[6],
    line-height: 1.2,
  },

  value: {
    font-size: theme.fontSizes.sm,
    font-weight: 700,
    color: theme.black,
  },

  count: {
    color: theme.colors.gray[6],
  },

  day: {
    font-size: 44,
    font-weight: 700,
    color: theme.white,
    line-height: 1,
    textAlign: 'center',
    margin-bottom: 5,
    font-family: Greycliff CF, var(--mantine-font-family),
  },

  month: {
    font-size: theme.fontSizes.sm,
    color: theme.white,
    line-height: 1,
    textAlign: 'center',
  },

  controls: {
    display: 'flex',
    flex-direction: 'column',
    marginRight: `calc(var(--mantine-spacing-xl)) * 2)`,

    [theme.fn.smallerThan('xs')]: {
      flex-direction: 'row',
      align-items: 'center',
      marginRight: 0,
      margin-bottom: var(--mantine-spacing-xl),
    },
  },

  date: {
    flex: 1,
    display: 'flex',
    flex-direction: 'column',
    justify-content: 'center',
  },

  control: {
    height: 28,
    width: '100%',
    color: theme.colors[theme.primaryColor][2],
    display: 'flex',
    justify-content: 'center',
    align-items: 'center',
    border-radius:var( --mantine-radius-md),
    transition: 'background-color 50ms ease',

    [theme.fn.smallerThan('xs')]: {
      height: 34,
      width: 34,
    },

    '&:hover': {
      background-color: theme.colors[theme.primaryColor][5],
      color: theme.white,
    },
  },

  controlIcon: {
    [theme.fn.smallerThan('xs')]: {
      transform: 'rotate(-90deg)',
    },
  },
}));

const data = [
  { icon: IconRun, label: 'Running' },
  { icon: IconSwimming, label: 'Swimming' },
  { icon: IconBike, label: 'Bike' },
];

export function StatsControls() {
  const { classes } = useStyles();
  const [date, setDate] = useState(new Date(2021, 9, 24));

  const stats = data.map((stat) => (
    <Paper className={classes.stat} radius="md" shadow="md" p="xs" key={stat.label}>
      <stat.icon size={32} className={classes.icon} stroke={1.5} />
      <div>
        <Text className={classes.label}>{stat.label}</Text>
        <Text size="xs" className={classes.count}>
          <span className={classes.value}>{Math.floor(Math.random() * 6 + 4)}km</span> / 10km
        </Text>
      </div>
    </Paper>
  ));

  return (
    <div className={classes.root}>
      <div className={classes.controls}>
        <UnstyledButton
          className={classes.control}
          onClick={() => setDate((current) => dayjs(current).add(1, 'day').toDate())}
        >
          <IconChevronUp className={classes.controlIcon} stroke={1.5} />
        </UnstyledButton>

        <div className={classes.date}>
          <Text className={classes.day}>{dayjs(date).format('DD')}</Text>
          <Text className={classes.month}>{dayjs(date).format('MMMM')}</Text>
        </div>

        <UnstyledButton
          className={classes.control}
          onClick={() => setDate((current) => dayjs(current).subtract(1, 'day').toDate())}
        >
          <IconChevronDown className={classes.controlIcon} stroke={1.5} />
        </UnstyledButton>
      </div>
      <Group style={{ flex: 1 }}>{stats}</Group>
    </div>
  );
}
