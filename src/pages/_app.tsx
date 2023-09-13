import { ColorScheme, ColorSchemeProvider, MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { getCookie, setCookie } from 'cookies-next';
import { GetServerSidePropsContext, NextPage } from 'next';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { ReactElement, ReactNode, useState } from 'react';
import { Provider as ReduxProvider } from 'react-redux';
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

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};
export default function App(props: AppProps & { colorScheme: ColorScheme }) {
  const { Component, pageProps }: AppPropsWithLayout = props;
  const [colorScheme, setColorScheme] = useState<ColorScheme>(props.colorScheme);

  const toggleColorScheme = (value?: ColorScheme) => {
    const nextColorScheme = value || (colorScheme === 'dark' ? 'dark' : 'light');
    setColorScheme(nextColorScheme);
    setCookie('mantine-color-scheme', nextColorScheme, { maxAge: 60 * 60 * 24 * 30 });
  };
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
          <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
            <MantineProvider
              theme={{
                // colors: myColors,
                primaryColor: 'yellow',
                // Default gradient used in components that support `variant="gradient"` (Button, ThemeIcon, etc.)
                defaultGradient: { deg: 45, from: 'yellow', to: 'gold' }, // primaryColor: 'sw-dark-blue',
                colorScheme,
                fontFamily: 'Lato, sans-serif',
              }}
              withGlobalStyles
              withNormalizeCSS
            >
              <DashboardLayoutContextProvider>
                <PaginationContextProvider>
                  <DrawerContextProvider>
                    <_ModalContextProvider>
                      <FilterContextProvider>
                        <Notifications />
                        {getLayout(<Component {...pageProps} />)}
                      </FilterContextProvider>
                    </_ModalContextProvider>
                  </DrawerContextProvider>
                </PaginationContextProvider>
              </DashboardLayoutContextProvider>
            </MantineProvider>
          </ColorSchemeProvider>
        </ReduxProvider>
      </AuthProvider>
    </>
  );
}

App.getInitialProps = ({ ctx }: { ctx: GetServerSidePropsContext }) => ({
  colorScheme: getCookie('mantine-color-scheme', ctx) || 'dark',
});
