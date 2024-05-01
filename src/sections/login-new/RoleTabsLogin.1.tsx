import { Box, Group, Stack, Tabs, Text } from "@mantine/core";
import Link from "next/link";
import { useLocale } from "../../../hooks/useLocale";
import { AUTH } from "../../path/path-frontend";
import LoginForm from "../login_signup/LoginForm";
import classes from "./RoleTabsLogin.module.css";
import { LoginTitleWithLogo } from "./LoginTitleWithLogo";
import useRouterWithCustomQuery from "../../hooks/useRouterWithCustomQuery";
import { RoleTabsLoginProps, tabs } from "./RoleTabsLogin";
import { RegisterLink } from "./components/RegisterLink";

export const RoleTabsLogin: React.FC<RoleTabsLoginProps> = (props: RoleTabsLoginProps) => {
  const { t } = useLocale("login");
  const { query } = useRouterWithCustomQuery();
  return (
    <>
      <Tabs
        // orientation="vertical"
        defaultValue="Users"
        classNames={{
          tab: "login-tab",
          list: "login-tab-list",
          panel: "login-tab-panel",
          root: "login-tab-root",
          tabLabel: "login-tab-label",
          tabSection: "login-tab-section",
        }}
      >
        <Tabs.List>
          {tabs.map((tab) => (
            <Tabs.Tab key={tab.value} value={tab.value}>
              <span>{t(tab.value)}</span>
            </Tabs.Tab>
          ))}
        </Tabs.List>
        {tabs.map((tab) => (
          <Tabs.Panel key={tab.value} value={tab.value}>
            {" "}
            <Box className={classes.container}>
              <LoginTitleWithLogo />
              <Stack gap={0}>
                <Text>You can use this credentials({tab.value})</Text>
                <Group>
                  <Text>email:</Text>
                  <Text>
                    <b> admin.sato@demo.com</b>
                  </Text>
                </Group>
                <Group>
                  <Text>password:</Text>
                  <Text>
                    <b> testabc</b>
                  </Text>
                </Group>
              </Stack>

              <LoginForm role={tab.role} />
              <RegisterLink />
            </Box>
          </Tabs.Panel>
        ))}
      </Tabs>
    </>
  );
};
