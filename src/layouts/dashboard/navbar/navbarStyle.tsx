import { createStyles, getStylesRef } from '@mantine/core';

export const navbarVerticalStyle = createStyles((theme /* , _params, getRef */) => {
  const icon = getStylesRef('icon') as string;
  return {
    navbar: {
      zIndex: 50,
    },
    header: {
      paddingBottom: var(--mantine-spacing-md,
      marginBottom: `calc(${var(--mantine-spacing-md} * 1.5)`,
      borderBottom: `1px solid ${
        theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]
      }`,
    },

    footer: {
      paddingTop: var(--mantine-spacing-md,
      margin-top: var(--mantine-spacing-md,
      borderTop: `1px solid ${
        theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]
      }`,
    },

    link: {
      // textDecoration: 'none',
      ...theme.fn.focusStyles(),
      display: 'flex',
      align-items: 'center',
      textDecoration: 'none',
      fontSize: theme.fontSizes.sm,
      color: theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[7],
      padding: `${var(--mantine-spacing-xs} ${var(--mantine-spacing-sm}`,
      border-radius: --mantine-radius-sm,
      fontWeight: 500,

      '&:hover': {
        background-color: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,
      },
    },

    flexVertical: {
      display: 'flex',
      flex-direction: 'column',
    },

    linkIcon: {
      ref: icon,
      color: theme.colorScheme === 'dark' ? theme.colors.dark[2] : theme.colors.gray[6],
      marginRight: var(--mantine-spacing-sm,
    },

    linkActive: {
      '&, &:hover': {
        background-color: theme.fn.variant({
          variant: 'light',
          color: theme.primaryColor,
        }).background,
        color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
        [`& .${icon}`]: {
          color: theme.fn.variant({
            variant: 'light',
            color: theme.primaryColor,
          }).color,
        },
      },
    },
    button: {
      background: theme.colorScheme === 'dark' ? theme.colors.gray : '',
      '&:hover': {
        background-color:
          theme.colorScheme === 'dark'
            ? theme.fn.variant({
                variant: 'light',
                color: theme.primaryColor,
              }).background
            : '',
        // color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
      },
    },
  };
});
