import '@mantine/notifications/styles.css';
import '@mantine/core/styles.css';

import { ActionIcon, MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { getCookie, setCookie } from 'cookies-next';
import { GetServerSidePropsContext, NextPage } from 'next';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { ReactElement, ReactNode, useState } from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { appWithTranslation } from 'next-i18next';
import { DashboardLayoutContextProvider } from '../context/DashboardLayoutContext';
import { DrawerContextProvider } from '../context/DataTableDrawerContext';
import { AuthProvider } from '../context/JWTContext';
import { PaginationContextProvider } from '../context/PaginationContext';
import { myColors } from '../lib/custom-colors';
import reduxStore from '../redux/store';
// import { CurrentSpaceContextProvider } from '../context/CurrentSpaceContext';
import { CookieContextProvider } from '../context/CookieContext';
import { FilterContextProvider } from '../context/FilterContext';
import { _ModalContextProvider } from '../context/modal-context/_ModalContext';
import '../styles/global.css';
import { ModalRootCustom } from '../context/modal-context/ModalRootCustom';
import { CardOverride } from '../overrides/CardOverrides';
import { components } from '../overrides';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};
function App(props: AppProps) {
  const { Component, pageProps }: AppPropsWithLayout = props;
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <>
      <Head>
        <title>Flatmates© </title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
        <link rel="manifest" href="/favicon/site.webmanifest" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
      </Head>

      <AuthProvider>
        <ReduxProvider store={reduxStore}>
          <MantineProvider
            theme={{
              // colors: myColors,
              primaryColor: 'yellow',
              // Default gradient used in components that support `variant="gradient"` (Button, ThemeIcon, etc.)
              defaultGradient: { deg: 45, from: 'yellow', to: 'gold' }, // primaryColor: 'sw-dark-blue',
              fontFamily: 'Lato, sans-serif',
              components,
            }}
            // withGlobalStyles
            // cssVariablesResolver
            withCssVariables
            // withNormalizeCSS
          >
            <DashboardLayoutContextProvider>
              <PaginationContextProvider>
                <DrawerContextProvider>
                  <_ModalContextProvider>
                    <FilterContextProvider>
                      <Notifications />
                      {getLayout(<Component {...pageProps} />)}
                      <ModalRootCustom />
                    </FilterContextProvider>
                  </_ModalContextProvider>
                </DrawerContextProvider>
              </PaginationContextProvider>
            </DashboardLayoutContextProvider>
          </MantineProvider>
        </ReduxProvider>
      </AuthProvider>
    </>
  );
}

App.getInitialProps = ({ ctx }: { ctx: GetServerSidePropsContext }) => ({
  colorScheme: getCookie('mantine-color-scheme', ctx) || 'dark',
});
export default appWithTranslation(App);
