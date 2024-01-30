import React, { ReactElement } from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Layout from '../layouts';
import { SignUpForm } from '../sections/login_signup/SignUpForm';

const SignUpPage = () => <SignUpForm />;

export default SignUpPage;

SignUpPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout variant="main">{page}</Layout>;
};

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'], null, ['en', 'it'])),
      // Will be passed to the page component as props
    },
  };
}
