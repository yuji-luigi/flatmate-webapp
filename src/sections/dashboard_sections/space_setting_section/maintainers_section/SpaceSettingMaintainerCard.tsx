import { createStyles, Avatar, Text, Group, Card, Stack, Badge, Box } from '@mantine/core';
import { IconPhoneCall, IconAt } from '@tabler/icons-react';
import { Icons } from '../../../../data/icons';
import { MaintainerCardLeftSection } from './MaintainerCardLeftSection';
const useStyles = createStyles((theme) => ({
  icon: {
    color: theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[5],
  },

  name: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },
}));

interface SpaceSettingMaintainerCardProps {
  maintainer: MaintainerModel;
}

export function SpaceSettingMaintainerCard({ maintainer }: SpaceSettingMaintainerCardProps) {
  const { classes } = useStyles();
  const { name, company, tel, email, address } = maintainer;

  return (
    <Card>
      <Group align="start" noWrap>
        <Avatar src={maintainer.avatar?.url || ''} size={160} radius="md" />
        <Group grow align="start" sx={{ width: '100%' }}>
          <MaintainerCardLeftSection maintainer={maintainer} />
          <Stack justify="flex-start" spacing={5}>
            <Box>
              <Text fz="md" tt="uppercase" fw={700} c="dimmed">
                - Works At -
              </Text>

              {maintainer.spaces.map((space) => (
                <Badge fz="sm" className={classes.name}>
                  {space.name}
                </Badge>
              ))}
            </Box>
            <Box>
              <Text fz="md" tt="uppercase" fw={700} c="dimmed">
                - Works Summary -
              </Text>

              {maintainer.spaces.map((space) => (
                <Badge fz="sm" className={classes.name}>
                  {space.name}
                </Badge>
              ))}
            </Box>
          </Stack>
        </Group>
      </Group>
    </Card>
  );
}
