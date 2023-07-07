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
    flexDirection: 'row',
    alignItems: 'end',
    justifyContent: 'space-between',
    // paddingInline: 10,

    // paddingInline: 32,
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
}));

export const profilePageStyle = createStyles((theme) => ({
  container: {
    paddingBlock: 32,
    marginInline: 16,
  },
  box: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,

    // Simplify media query writing with theme functions
    [theme.fn.smallerThan('sm')]: {
      flexDirection: 'column',
    },

    // Static media query
    [`@media (max-width: ${em(800)})`]: {},
  },
  cardMain: {
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
    width: '70%',
    [theme.fn.smallerThan('md')]: {
      width: '60%', // backgroundColor: theme.cdolors.yellow[6],
    },
    [theme.fn.smallerThan('sm')]: {
      width: '100%', // backgroundColor: theme.cdolors.yellow[6],
    },
  },
  sideBox: {
    width: '30%',
    gap: 16,
    display: 'flex',
    flexDirection: 'column',
    [theme.fn.smallerThan('md')]: {
      width: '100%', // backgroundColor: theme.cdolors.yellow[6],
    },
    [theme.fn.smallerThan('sm')]: {
      width: '100%', // backgroundColor: theme.cdolors.yellow[6],
      // flexDirection: 'row',
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
