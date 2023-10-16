import { createStyles, Text } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  root: {
    display: 'flex',
    backgroundImage: `linear-gradient(-60deg, ${theme.colors[theme.primaryColor][4]} 0%, ${
      theme.colors[theme.primaryColor][7]
    } 100%)`,
    padding: `calc(var(--mantine-spacing-xl)) * 1.5)`,
    border-radius:var( --mantine-radius-md),

    @media (max-width: $mantine-breakpoint-sm): {
      flex-direction: 'column',
    },
  },

  title: {
    color: theme.white,
    textTransform: 'uppercase',
    font-weight: 700,
    font-size: theme.fontSizes.sm,
  },

  count: {
    color: theme.white,
    font-size: 32,
    line-height: 1,
    font-weight: 700,
    margin-bottom: var(--mantine-spacing-md),
    font-family: Greycliff CF, var(--mantine-font-family),
  },

  description: {
    color: theme.colors[theme.primaryColor][0],
    font-size: theme.fontSizes.sm,
    margin-top: 5,
  },

  stat: {
    flex: 1,

    '& + &': {
      paddingLeft: var(--mantine-spacing-xl),
      margin-left: var(--mantine-spacing-xl),
      borderLeft: `1px solid ${theme.colors[theme.primaryColor][3]}`,

      @media (max-width: $mantine-breakpoint-sm): {
        paddingLeft: 0,
        margin-left: 0,
        borderLeft: 0,
        padding-top: var(--mantine-spacing-xl),
        margin-top: var(--mantine-spacing-xl),
        borderTop: `1px solid ${theme.colors[theme.primaryColor][3]}`,
      },
    },
  },
}));

interface StatsGroupProps {
  data: { title: string; stats: string; description: string }[];
}

export function StatsGroup({ data }: StatsGroupProps) {
  const { classes } = useStyles();
  const stats = data.map((stat) => (
    <div key={stat.title} className={classes.stat}>
      <Text className={classes.count}>{stat.stats}</Text>
      <Text className={classes.title}>{stat.title}</Text>
      <Text className={classes.description}>{stat.description}</Text>
    </div>
  ));
  return <div className={classes.root}>{stats}</div>;
}
