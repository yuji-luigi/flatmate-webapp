import { Popover, Text, Button, Group, Avatar, Box, Divider, Menu } from '@mantine/core';
import Link from 'next/link';
import useAuth from '../../../hooks/useAuth';
import { Icons } from '../../data/icons/icons';
import { PATH_CLIENT } from '../../path/path-frontend';
import classes from './ProfilePopover.module.css';
import { LanguageMenu } from '../menu/LanguageMenu/LanguageMenu';

const popoverList = [
  {
    title: 'Edit profile',
    icon: <Icons.user />,
    link: '/profile',
  },
  {
    title: 'Setting condominium',
    icon: <Icons.userSettings />,
    link: PATH_CLIENT.spaceSettings,
  },
];
export function ProfilePopover() {
  const { user, logout } = useAuth();

  return (
    <Menu position="bottom" withArrow shadow="md">
      <Group justify="left">
        <Menu.Target>
          <Avatar className={classes.avatar} size={50} />
        </Menu.Target>
        <div className={classes.flexVertical}>
          <Text className={classes.profileText} fw={700}>
            {user?.name} {user?.surname}
          </Text>
          <Text className={classes.profileText} fw={500}>
            {user?.email}
          </Text>
          <LanguageMenu />
        </div>
      </Group>
      <Menu.Dropdown>
        <Menu.Label style={{ textAlign: 'center' }}>Settings</Menu.Label>
        <Box px={8} py={16}>
          {/* // todo: onhover change color */}
          {popoverList.map((list) => (
            <Menu.Item component={Link} key={list.title} className={classes.link} href={list.link}>
              {list.icon}
              {list.title}
            </Menu.Item>
          ))}
        </Box>
      </Menu.Dropdown>
    </Menu>
  );
}
