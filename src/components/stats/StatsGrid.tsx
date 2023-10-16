import { Group, Paper, SimpleGrid, Text, Box } from '@mantine/core';
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

// const useStyles = createStyles((theme) => ({
//   root: {
//     padding: `calc(var(--mantine-spacing-xl)) * 1.5)`,
//   },

//   value: {
//     font-size: 24,
//     font-weight: 700,
//     line-height: 1,
//   },

//   diff: {
//     line-height: 1,
//     display: 'flex',
//     align-items: 'center',
//   },

//   icon: {
//     color: light-dark(var(--mantine-color-gray-4), var(--mantine-color-dark-3)),
//   },

//   title: {
//     font-weight: 700,
//     textTransform: 'uppercase',
//   },
// }));

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
  const { t } = useTranslation('common');
  const A = data as unknown;
  const stats = (A as Array<StatGridSchema>).map((stat) => {
    const Icon = typeof stat.icon === 'string' ? _icons[stat.icon] : stat.icon;
    const DiffIcon = stat.diff && stat.diff > 0 ? IconArrowUpRight : IconArrowDownRight;

    return (
      <Box key={stat.title} className={classesM.card}>
        <Paper withBorder p="md" radius="md" key={stat.title}>
          <Group justify="apart">
            <Text size="xs" color="dimmed" className={classesM.title}>
              {t(stat.title)}
            </Text>
            {Icon && <Icon className={classesM.icon} size={22} stroke={1.5} />}
          </Group>

          <Group align="flex-end" gap="xs" mt={25}>
            <Text className={classesM.value}>
              {stat.unit}
              {stat.value}
            </Text>
            {stat.diff && (
              <Text
                color={stat.diff > 0 ? 'teal' : 'red'}
                size="sm"
                fw={500}
                className={classesM.diff}
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
      cols={{
        sm: 1,
        md: 2,
      }}
      style={{ width: '100%' }}
      className={classesM.container}
      //   breakpoints={[
      //     { maxWidth: 'md', cols: 2 },
      //     { maxWidth: 'sm', cols: 1 },
      //   ]}
    >
      {stats}
    </SimpleGrid>
  );
  // return <Group className={classesM.container}>{stats}</Group>;
}
