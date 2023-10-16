import { Image, Container, Title, Text, Button, SimpleGrid } from '@mantine/core';
import Link from 'next/link';
// eslint-disable-next-line import/no-absolute-path
import image from '/public/images/404-mantine.svg';
import Head from 'next/head';
import classes from './404.module.css';

// const useStyles = createStyles((theme) => ({
//   root: {
//     padding-top: 80,
//     padding-bottom: 80,
//   },

//   title: {
//     font-weight: 900,
//     font-size: 34,
//     margin-bottom: var(--mantine-spacing-md),
//     font-family: Greycliff CF, var(--mantine-font-family),

//     @media (max-width: $mantine-breakpoint-sm): {
//       font-size: 32,
//     },
//   },

//   control: {
//     @media (max-width: $mantine-breakpoint-sm): {
//       width: '100%',
//     },
//   },

//   mobileImage: {
//     @media (min-width: $mantine-breakpoint-sm): {
//       display: 'none',
//     },
//   },

//   desktopImage: {
//     @media (max-width: $mantine-breakpoint-sm): {
//       display: 'none',
//     },
//   },
// }));

export default function NotFoundImage() {
  return (
    <>
      <Head>
        <title>Page not found</title>
      </Head>
      <Container className={classes.root}>
        <SimpleGrid
          spacing={{ sm: 40, base: 80 }}
          cols={{ sm: 1 }}
          // breakpoints={[{ maxWidth: 'sm', cols: 1, spacing: 40 }]}
        >
          <Image src="/images/404-mantine.svg" className={classes.mobileImage} />
          <div>
            <Title className={classes.title}>Something is not right...</Title>
            <Text color="dimmed" size="lg">
              Page you are trying to open does not exist. You may have mistyped the address, or the
              page has been moved to another URL. If you think this is an error contact support.
            </Text>
            <Link href="/dashboard">
              <Button variant="outline" size="md" mt="xl" className={classes.control}>
                Get back to home page
              </Button>
            </Link>
          </div>
          <Image src={image.src} className={classes.desktopImage} />
        </SimpleGrid>
      </Container>
    </>
  );
}
