import { createStyles, Card, Avatar, Text, Group, Button, rem } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  card: {
    background-color: light-dark(var(--mantine-color-gray-7), var(--mantine-color-white)),
  },

  avatar: {
    border: `${rem(2)} solid ${light-dark(var(--mantine-color-gray-7), var(--mantine-color-white))}`,
  },
}));

interface UserCardProps {
  image: string;
  avatar: string;
  name: string;
  job: string;
  stats: { label: string; value: string }[];
}

export function UserCard({ data }: { data: UserCardProps }) {
  const { image, avatar, name, job, stats } = data;
  const { classes, theme } = useStyles();

  const items = stats.map((stat) => (
    <div key={stat.label}>
      <Text ta="center" fz="lg" fw={500}>
        {stat.value}
      </Text>
      <Text ta="center" fz="sm" c="dimmed">
        {stat.label}
      </Text>
    </div>
  ));

  return (
    <Card withBorder padding="xl" radius="md" className={classes.card}>
      <Card.Section style={{ backgroundImage: `url(${image})`, height: 140 }} />
      <Avatar src={avatar} size={80} radius={80} mx="auto" mt={-30} className={classes.avatar} />
      <Text ta="center" fz="lg" fw={500} mt="sm">
        {name}
      </Text>
      <Text ta="center" fz="sm" c="dimmed">
        {job}
      </Text>
      <Group mt="md" position="center" spacing={30}>
        {items}
      </Group>
      <Button
        fullWidth
        radius="md"
        mt="xl"
        size="md"
        color={theme.colorScheme === 'dark' ? undefined : 'dark'}
      >
        Follow
      </Button>
    </Card>
  );
}
