import { Container, SimpleGrid, Title, Button, Image, Text } from '@mantine/core';
import Head from 'next/head';
import Link from 'next/link';
import React from 'react';
import classes from './NoSpacesFound.module.css';
// eslint-disable-next-line import/no-absolute-path
import image from '/public/images/man-question-mark.png';
import { useLocale } from '../../../../hooks/useLocale';

export const NoSpacesFound = () => {
  const { t } = useLocale('common');
  return (
    <>
      {' '}
      <Head>
        <title>Page not found</title>
      </Head>
      <Container className="error-page-container">
        <Title className={`${classes.title} error-page-container`}>
          {t('Something is not right...')}
        </Title>
        <div className="error-page-description">
          <Image src={image.src} alt="error" />
          <Text color="dimmed" size="lg">
            {t('errorPage.spaceNotFoundMsg1')}
          </Text>
          <Link href="/">
            <Button variant="outline" size="md" mt="xl" className={classes.control}>
              Get back to home page
            </Button>
          </Link>
        </div>
      </Container>
    </>
  );
};
