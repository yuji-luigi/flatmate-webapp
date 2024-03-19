import { Avatar, Table, Group, Text, ActionIcon, Menu, ScrollArea } from "@mantine/core";
import {
  IconPencil,
  IconMessages,
  IconNote,
  IconReportAnalytics,
  IconTrash,
  IconDots,
} from "@tabler/icons-react";

interface UsersStackProps {
  data: { avatar: string; name: string; job: string; email: string; rate: number }[];
}

export function UsersStack({ data }: UsersStackProps) {
  const rows = data.map((item) => (
    <tr key={item.name}>
      <td>
        <Group gap="sm">
          <Avatar size={40} src={item.avatar} radius={40} />
          <div>
            <Text size="sm" fw={500}>
              {item.name}
            </Text>
            <Text color="dimmed" size="xs">
              {item.job}
            </Text>
          </div>
        </Group>
      </td>
      <td>
        <Text size="sm">{item.email}</Text>
        <Text size="xs" color="dimmed">
          Email
        </Text>
      </td>
      <td>
        <Text size="sm">${item.rate.toFixed(1)} / hr</Text>
        <Text size="xs" color="dimmed">
          Rate
        </Text>
      </td>
      <td>
        <Group gap={0} justify="right">
          <ActionIcon>
            <IconPencil size={16} stroke={1.5} />
          </ActionIcon>
          <Menu
            transitionProps={{ transition: "pop" }}
            withArrow
            position="bottom-end"
            // withinPortal
          >
            <Menu.Target>
              <ActionIcon>
                <IconDots size={16} stroke={1.5} />
              </ActionIcon>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item leftSection={<IconMessages size={16} stroke={1.5} />}>
                Send message
              </Menu.Item>
              <Menu.Item leftSection={<IconNote size={16} stroke={1.5} />}>Add note</Menu.Item>
              <Menu.Item leftSection={<IconReportAnalytics size={16} stroke={1.5} />}>
                Analytics
              </Menu.Item>
              <Menu.Item leftSection={<IconTrash size={16} stroke={1.5} />} color="red">
                Terminate contract
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
      </td>
    </tr>
  ));

  return (
    <ScrollArea>
      <Table style={{ minWidth: 800 }} verticalSpacing="md">
        <tbody>{rows}</tbody>
      </Table>
    </ScrollArea>
  );
}
