import { createStyles, Group, Paper, SimpleGrid, Text, Box } from '@mantine/core';
import {
  IconDiscount2,
  IconCoin,
  IconArrowUpRight,
  IconArrowDownRight,
  TablerIconsProps,
} from '@tabler/icons-react';
import { useTranslation } from 'next-i18next';
import { Icons } from '../../data/icons/icons';
import classesM from './StatsGrid.module.css';

const useStyles = createStyles((theme) => ({
  root: {
    padding: `calc(${theme.spacing.xl} * 1.5)`,
  },

  value: {
    fontSize: 24,
    fontWeight: 700,
    lineHeight: 1,
  },

  diff: {
    lineHeight: 1,
    display: 'flex',
    alignItems: 'center',
  },

  icon: {
    color: theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[4],
  },

  title: {
    fontWeight: 700,
    textTransform: 'uppercase',
  },
}));

const _icons = {
  // user: IconUserPlus,
  discount: IconDiscount2,
  // receipt: IconReceipt2,
  coin: IconCoin,
  ...Icons,
} as const;

type IconIndex = keyof typeof _icons;

export type StatGridSchema = {
  title: string;
  value: number;
  icon?: IconIndex | ((props?: TablerIconsProps) => JSX.Element);
  diff?: number;
  unit?: string;
};

export function StatsGrid({ data }: { data: StatGridSchema[] }) {
  const { classes } = useStyles();
  const { t } = useTranslation('common');
  const A = data as unknown;
  const stats = (A as Array<StatGridSchema>).map((stat) => {
    const Icon = typeof stat.icon === 'string' ? _icons[stat.icon] : stat.icon;
    const DiffIcon = stat.diff && stat.diff > 0 ? IconArrowUpRight : IconArrowDownRight;

    return (
      <Box key={stat.title} className={classesM.card}>
        <Paper withBorder p="md" radius="md" key={stat.title}>
          <Group position="apart">
            <Text size="xs" color="dimmed" className={classes.title}>
              {t(stat.title)}
            </Text>
            {Icon && <Icon className={classes.icon} size={22} stroke={1.5} />}
          </Group>

          <Group align="flex-end" spacing="xs" mt={25}>
            <Text className={classes.value}>
              {stat.unit}
              {stat.value}
            </Text>
            {stat.diff && (
              <Text
                color={stat.diff > 0 ? 'teal' : 'red'}
                size="sm"
                weight={500}
                className={classes.diff}
              >
                <span>{stat.diff}%</span>
                <DiffIcon size={16} stroke={1.5} />
              </Text>
            )}
          </Group>

          <Text size="xs" color="dimmed" mt={7}>
            Compared to previous month
          </Text>
        </Paper>
      </Box>
    );
  });
  return (
    <SimpleGrid
      cols={3}
      sx={{ width: '100%' }}
      className={classesM.container}
      breakpoints={[
        { maxWidth: 'md', cols: 2 },
        { maxWidth: 'sm', cols: 1 },
      ]}
    >
      {stats}
    </SimpleGrid>
  );
  // return <Group className={classesM.container}>{stats}</Group>;
}
