import { createStyles, em } from '@mantine/core';

//Todo: document where to use this
// dataTableContainer class is used in dashboard datatables
export const dashboardStyle = createStyles((theme, params, variations) => ({
  mainContainer: {
    paddingInline: 40,
    paddingTop: 30,
  },
  headerWrapper: {
    display: 'flex',
    width: '100%',
    flex-direction: 'row',
    align-items: 'end',
    justifyContent: 'space-between',
  },
  title: {
    marginBlock: 5,
  },
  button: {
    minWidth: 150,
    // marginLeft: 40,
  },
  dataTableContainer: {
    [theme.fn.largerThan('md')]: {
      paddingInline: 40,
    },
    [theme.fn.smallerThan('md')]: {
      paddingInline: 20,
    },
  },
  navList: {
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
      background-color: theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[0],
      color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    },
  },
  justifyEnd: {
    justifyContent: 'flex-end',
  },
}));

export const profilePageStyle = createStyles((theme) => ({
  container: {
    // width: '100%',
    paddingBlock: 32,
    marginInline: 16,
    @media (max-width: 768px): {
      marginInline: 0,
    },
  },
  box: {
    width: '100%',
    display: 'flex',
    flex-direction: 'row',
    justifyContent: 'center',
    // background: 'white',
    gap: 24,

    // Simplify media query writing with theme functions
    @media (max-width: 768px): {
      flex-direction: 'column',
    },

    // Static media query
    [`@media (max-width: ${em(800)})`]: {},
  },
  cardMain: {
    display: 'flex',
    flex-direction: 'column',
    gap: 36,
    width: '100%',
    [theme.fn.smallerThan('md')]: {
      width: '60%', // background-color: theme.cdolors.yellow[6],
    },
    @media (max-width: 768px): {
      width: '100%', // background-color: theme.cdolors.yellow[6],
    },
  },
  coverTop: {
    display: 'flex',
    flex-direction: 'column',
    gap: 36,
    width: '100%',
    [theme.fn.smallerThan('md')]: {
      width: '60%', // background-color: theme.cdolors.yellow[6],
    },
    @media (max-width: 768px): {
      width: '100%', // background-color: theme.cdolors.yellow[6],
    },
  },
  sideBox: {
    width: '30%',
    gap: 16,
    display: 'flex',
    flex-direction: 'column',
    [theme.fn.smallerThan('md')]: {
      width: '100%', // background-color: theme.cdolors.yellow[6],
    },
    @media (max-width: 768px): {
      width: '100%', // background-color: theme.cdolors.yellow[6],
      // flex-direction: 'row',
    },
  },
  feedCard: {
    minHeight: 200,
  },
  feedContent: {
    padding: 16,
    paddingInline: 24,
  },
}));

export const feedStyles = createStyles((theme) => ({
  // feedCard: {
  //   minHeight: 200,
  //   border-radius: RADIUS.CARD,
  // },
  // feedContent: {
  //   // padding: 16,
  //   // paddingInline: 24,
  // },
}));

export const RADIUS = {
  CARD: 12,
};
