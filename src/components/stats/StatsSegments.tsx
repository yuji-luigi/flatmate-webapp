import { createStyles, Progress, Box, Text, Group, Paper, SimpleGrid } from '@mantine/core';
import { IconArrowUpRight, IconDeviceAnalytics } from '@tabler/icons-react';

const useStyles = createStyles((theme) => ({
  progressLabel: {
    font-family: Greycliff CF, var(--mantine-font-family),
    line-height: 1,
    font-size: theme.fontSizes.sm,
  },

  stat: {
    borderBottom: '3px solid',
    padding-bottom: 5,
  },

  statCount: {
    font-family: Greycliff CF, var(--mantine-font-family),
    line-height: 1.3,
  },

  diff: {
    font-family: Greycliff CF, var(--mantine-font-family),
    display: 'flex',
    align-items: 'center',
  },

  icon: {
    color: light-dark(var(--mantine-color-gray-4), var(--mantine-color-dark-3)),
  },
}));

interface StatsSegmentsProps {
  total: string | number;
  diff: number;
  data: {
    label: string;
    count: string;
    part: number;
    color: string;
  }[];
}

export function StatsSegments({ total, diff, data }: StatsSegmentsProps) {
  const { classes } = useStyles();

  const segments = data.map((segment) => ({
    value: segment.part,
    color: segment.color,
    label: segment.part > 10 ? `${segment.part}%` : undefined,
  }));

  const descriptions = data.map((stat) => (
    <Box key={stat.label} style={{ borderBottomColor: stat.color }} className={classes.stat}>
      <Text transform="uppercase" size="xs" color="dimmed" weight={700}>
        {stat.label}label
      </Text>

      <Group position="apart" align="flex-end" spacing={0}>
        <Text weight={700}>{stat.count}100</Text>
        <Text color={stat.color} weight={700} size="sm" className={classes.statCount}>
          {stat.part}%
        </Text>
      </Group>
    </Box>
  ));

  return (
    <Paper withBorder p="md" radius="md">
      <Group position="apart">
        <Group align="flex-end" spacing="xs">
          <Text size="xl" weight={700}>
            {total}
          </Text>
          <Text color="teal" className={classes.diff} size="sm" weight={700}>
            <span>{diff}%</span>
            <IconArrowUpRight size={16} style={{ marginBottom: 4 }} stroke={1.5} />
          </Text>
        </Group>
        <IconDeviceAnalytics size={20} className={classes.icon} stroke={1.5} />
      </Group>

      <Text color="dimmed" size="sm">
        Page views compared to previous month
      </Text>

      <Progress
        sections={segments}
        size={34}
        classNames={{ label: classes.progressLabel }}
        mt={40}
      />
      <SimpleGrid cols={3} breakpoints={[{ max-width: 'xs', cols: 1 }]} mt="xl">
        {descriptions}
      </SimpleGrid>
    </Paper>
  );
}
