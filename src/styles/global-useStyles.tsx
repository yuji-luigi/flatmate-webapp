// import { createStyles, em } from '@mantine/core';

// export const RADIUS = {
//   CARD: 12,
// };

// //Todo: document where to use this
// // dataTableContainer class is used in dashboard datatables
// export const dashboardStyle = createStyles((theme, params, variations) => ({
//   mainContainer: {
//     padding-inline: 40,
//     padding-top: 30,
//   },
//   headerWrapper: {
//     display: 'flex',
//     width: '100%',
//     flex-direction: 'row',
//     align-items: 'end',
//     justify-content: 'space-between',
//   },
//   title: {
//     marginBlock: 5,
//   },
//   button: {
//     minWidth: 150,
//     // margin-left: 40,
//   },
//   dataTableContainer: {
//     @media (min-width: $mantine-breakpoint-md) {
//       padding-inline: 40,
//     },
//      @media (max-width: $mantine-breakpoint-md): {
//       padding-inline: 20,
//     },
//   },
//   navList: {
//     // textDecoration: 'none',
//     ...theme.fn.focusStyles(),
//     display: 'flex',
//     align-items: 'center',
//     textDecoration: 'none',
//     font-size: theme.fontSizes.sm,
//     color: light-dark(var(--mantine-color-gray-7), var(--mantine-color-dark-1)),
//     padding: `var(--mantine-spacing-xs) var(--mantine-spacing-sm),
//     border-radius: var(--mantine-radius-sm),
//     font-weight: 500,
//     '&:hover': {
//       background-color: theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[0],
//       color: light-dark(var(--mantine-color-black), var(--mantine-color-white)),
//     },
//   },
//   justifyEnd: {
//     justify-content: 'flex-end',
//   },
// }));

// export const profilePageStyle = createStyles((theme) => ({
//   container: {
//     // width: '100%',
//     paddingBlock: 32,
//     marginInline: 16,
//     @media (max-width: $mantine-breakpoint-sm): {
//       marginInline: 0,
//     },
//   },
//   box: {
//     width: '100%',
//     display: 'flex',
//     flex-direction: 'row',
//     justify-content: 'center',
//     // background: 'white',
//     gap: 24,

//     // Simplify media query writing with theme functions
//     @media (max-width: $mantine-breakpoint-sm): {
//       flex-direction: 'column',
//     },

//     // Static media query
//     [`@media (max-width: ${em(800)})`]: {},
//   },
//   cardMain: {
//     display: 'flex',
//     flex-direction: 'column',
//     gap: 36,
//     width: '100%',
//      @media (max-width: $mantine-breakpoint-md): {
//       width: '60%', // background-color: theme.cdolors.yellow[6],
//     },
//     @media (max-width: $mantine-breakpoint-sm): {
//       width: '100%', // background-color: theme.cdolors.yellow[6],
//     },
//   },
//   coverTop: {
//     display: 'flex',
//     flex-direction: 'column',
//     gap: 36,
//     width: '100%',
//      @media (max-width: $mantine-breakpoint-md): {
//       width: '60%', // background-color: theme.cdolors.yellow[6],
//     },
//     @media (max-width: $mantine-breakpoint-sm): {
//       width: '100%', // background-color: theme.cdolors.yellow[6],
//     },
//   },
//   sideBox: {
//     width: '30%',
//     gap: 16,
//     display: 'flex',
//     flex-direction: 'column',
//      @media (max-width: $mantine-breakpoint-md): {
//       width: '100%', // background-color: theme.cdolors.yellow[6],
//     },
//     @media (max-width: $mantine-breakpoint-sm): {
//       width: '100%', // background-color: theme.cdolors.yellow[6],
//       // flex-direction: 'row',
//     },
//   },
//   feedCard: {
//     min-height: 200,
//   },
//   feedContent: {
//     padding: 16,
//     padding-inline: 24,
//   },
// }));

// export const feedStyles = createStyles((theme) => ({
//   // feedCard: {
//   //   min-height: 200,
//   //   border-radius: RADIUS.CARD,
//   // },
//   // feedContent: {
//   //   // padding: 16,
//   //   // padding-inline: 24,
//   // },
// }));
