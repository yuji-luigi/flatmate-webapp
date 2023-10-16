import { Popover, Text, Button, Group, Avatar, Box, Divider, Menu } from '@mantine/core';
import Link from 'next/link';
import useAuth from '../../../hooks/useAuth';
import { Icons } from '../../data/icons/icons';
import { PATH_CLIENT } from '../../path/path-frontend';

// const useStyles = createStyles((theme /* , _params, getRef */) => {
//   const icon = getStylesRef('icon') as string;

//   return {
//     header: {
//       padding-bottom: var(--mantine-spacing-md),
//       margin-bottom: `calc(var(--mantine-spacing-md) * 1.5)`,
//       borderBottom: `1px solid ${
//         light-dark(var(--mantine-color-gray-2), var(--mantine-color-dark-4))
//       }`,
//     },
//     flexVertical: {
//       display: 'flex',
//       flex-direction: 'column',
//     },
//     avatar: {
//       cursor: 'pointer',
//     },
//     link: {
//       // textDecoration: 'none',
//       ...theme.fn.focusStyles(),
//       display: 'flex',
//       align-items: 'center',
//       textDecoration: 'none',
//       fontSize: theme.fontSizes.sm,
//       color: light-dark(var(--mantine-color-gray-7), var(--mantine-color-dark-1)),
//       padding: `var(--mantine-spacing-xs) var(--mantine-spacing-sm)`,
//       border-radius: var(--mantine-radius-sm),
//       fontWeight: 500,
//       '&:hover': {
//         background-color: light-dark(var(--mantine-color-gray-0), var(--mantine-color-dark-3)),
//         color: light-dark(var(--mantine-color-black), var(--mantine-color-white)),
//       },
//     },
//     linkIcon: {
//       ref: icon,
//       color: light-dark(var(--mantine-color-gray-6), var(--mantine-color-dark-2)),
//       marginRight: var(--mantine-spacing-sm),
//     },

//     linkActive: {
//       '&, &:hover': {
//         background-color: theme.fn.variant({
//           variant: 'light',
//           color: theme.primaryColor,
//         }).background,
//         color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
//         [`& .${icon}`]: {
//           color: theme.fn.variant({
//             variant: 'light',
//             color: theme.primaryColor,
//           }).color,
//         },
//       },
//     },
//   };
// });

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
  const { classes, cx } = useStyles();

  return (
    <Menu position="bottom" withArrow shadow="md">
      <Group className={classes.header} position="left">
        <Menu.Target>
          <Avatar className={classes.avatar} size={50} />
        </Menu.Target>
        <div className={classes.flexVertical}>
          <Text fw={700}>{user?.name}</Text>
          <Text fw={500}>{user?.email}</Text>
        </div>
      </Group>
      <Menu.Dropdown>
        <Menu.Label style={{ textAlign: 'center' }}>Settings</Menu.Label>
        <Box px={8} py={16}>
          {/* // todo: onhover change color */}
          {popoverList.map((list) => (
            <Link
              key={list.title}
              className={cx(classes.link, {
                [classes.linkActive]: false,
              })}
              href={list.link}
            >
              {list.icon}
              {list.title}
            </Link>
          ))}
        </Box>
      </Menu.Dropdown>
    </Menu>
  );
}
