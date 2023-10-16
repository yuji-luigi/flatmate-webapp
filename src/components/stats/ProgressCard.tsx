import { Text, Progress, Card } from '@mantine/core';

export function ProgressCard() {
  return (
    <Card
      withBorder
      radius="md"
      p="xl"
      style={(theme) => ({
        background-color: light-dark(var(--mantine-color-gray-7), var(--mantine-color-white)),
      })}
    >
      <Text size="xs" transform="uppercase" weight={700} color="dimmed">
        Monthly goal
      </Text>
      <Text size="lg" weight={500}>
        $5.431 / $10.000
      </Text>
      <Progress value={54.31} mt="md" size="lg" radius="xl" />
    </Card>
  );
}
