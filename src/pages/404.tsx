import { createStyles, Image, Container, Title, Text, Button, SimpleGrid } from '@mantine/core';
import Link from 'next/link';
// eslint-disable-next-line import/no-absolute-path
import image from '/public/images/404-mantine.svg';
import Head from 'next/head';

const useStyles = createStyles((theme) => ({
  root: {
    paddingTop: 80,
    paddingBottom: 80,
  },

  title: {
    fontWeight: 900,
    fontSize: 34,
    marginBottom: var(--mantine-spacing-md,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,

    @media (max-width: 768px): {
      fontSize: 32,
    },
  },

  control: {
    @media (max-width: 768px): {
      width: '100%',
    },
  },

  mobileImage: {
    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },

  desktopImage: {
    @media (max-width: 768px): {
      display: 'none',
    },
  },
}));

export default function NotFoundImage() {
  const { classes } = useStyles();

  return (
    <>
      <Head>
        <title>Page not found</title>
      </Head>
      <Container className={classes.root}>
        <SimpleGrid spacing={80} cols={2} breakpoints={[{ max-width: 'sm', cols: 1, spacing: 40 }]}>
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
