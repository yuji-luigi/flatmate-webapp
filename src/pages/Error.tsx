import { Image, Container, Title, Text, Button, SimpleGrid } from '@mantine/core';
import Link from 'next/link';
// eslint-disable-next-line import/no-absolute-path
import image from '/public/images/404-mantine.svg';
import Head from 'next/head';
import classes from './Error.module.css';

export default function NotFoundImage() {
  return (
    <>
      <Head>
        <title>Un Error occurred</title>
      </Head>
      <Container className={classes.root}>
        <SimpleGrid
          spacing={{
            sm: 40,
            base: 80,
          }}
          cols={{
            sm: 1,
            base: 2,
          }}
        >
          <Image src="/images/404-mantine.svg" className={classes.mobileImage} />
          <div>
            <Title className={classes.title}>Something is not right...</Title>
            <Text color="dimmed" size="lg">
              Something happened the server... If you think this is an error contact support.
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
