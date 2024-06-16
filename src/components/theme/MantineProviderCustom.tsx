import { CSSVariablesResolver, MantineProvider } from "@mantine/core";
// import "@mantine/core/styles.css";
// import "@mantine/notifications/styles.css";
// import "@mantine/dates/styles.css";
import React, { ReactNode } from "react";
import { components } from "../../overrides";

const resolver: CSSVariablesResolver = (theme) => ({
  variables: {
    "--mantine-hero-height": theme.other.heroHeight,
  },
  light: {
    "--mantine-color-body": theme.colors.gray[3],
    "--mantine-color-primary": theme.colors.yellow[5],
  },
  dark: {
    "--mantine-color-primary": theme.colors.yellow[5],
    // '--mantine-color-body': 'red',
  },
});
export const MantineProviderCustom = ({ children }: { children: ReactNode }) => {
  return (
    <MantineProvider
      defaultColorScheme="dark"
      theme={{
        // colors: myColors,
        primaryColor: "yellow",

        // Default gradient used in components that support `variant="gradient"` (Button, ThemeIcon, etc.)
        defaultGradient: { deg: 45, from: "yellow", to: "gold" }, // primaryColor: 'sw-dark-blue',
        fontFamily: "Lato, sans-serif",
        components,
      }}
      // withGlobalStyles
      cssVariablesResolver={resolver}
      withCssVariables
    >
      {children}
    </MantineProvider>
  );
};
