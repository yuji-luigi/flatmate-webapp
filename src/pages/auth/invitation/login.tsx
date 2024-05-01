import React, { ReactElement } from "react";
import { Box, Button, Card, Stack, Text, TextInput } from "@mantine/core";
import Link from "next/link";
import { redirect } from "next/dist/server/api-utils";
import Layout from "../../../layouts";
import { useLocale } from "../../../../hooks/useLocale";
import { _PATH_FRONTEND } from "../../../path/path-frontend";
import useRouterWithCustomQuery from "../../../hooks/useRouterWithCustomQuery";

const InvitationLoginPage = () => {
  const { t } = useLocale();
  const { query } = useRouterWithCustomQuery();
  console.log(query);
  return (
    <main className="main-container">
      <Stack>
        <Text ta="center" fz={40} fw="bold" my={36}>
          {t("you are invited")}
        </Text>
        <Card className="login-card">
          <Text ta="center" fz={24} fw="bold">
            {t("Login if you have an account")}
          </Text>
          <TextInput label="email" />
          <TextInput label="password" mb={32} />
          <Button>{t("Login")}</Button>
          <Text ta="end" fz={14} fw="bold">
            {t('If you don"t have an account.')}{" "}
            <Link
              style={{
                color: "var(--mantine-color-primary)",
              }}
              href={{
                pathname: _PATH_FRONTEND.auth.invitationRegister,
                query: { redirect: query.redirect },
              }}
            >
              {t("Register")}
            </Link>
          </Text>
        </Card>
      </Stack>
    </main>
  );
};

export default InvitationLoginPage;
InvitationLoginPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout variant="main">{page}</Layout>;
};
