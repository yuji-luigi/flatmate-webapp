import React, { ReactElement } from "react";
import { Box, Button, Card, Stack, Text, TextInput } from "@mantine/core";
import Link from "next/link";
import { redirect } from "next/dist/server/api-utils";
import Image from "next/image";
import Layout from "../../../layouts";
import { useLocale } from "../../../../hooks/useLocale";
import { _PATH_FRONTEND } from "../../../path/path-frontend";
import useRouterWithCustomQuery from "../../../hooks/useRouterWithCustomQuery";
import { PATH_IMAGE } from "../../../lib/image-paths";

const InvitationLoginPage = () => {
  const { t } = useLocale();
  const { query } = useRouterWithCustomQuery();
  console.log(query);
  return (
    <main className="main-container">
      <Stack>
        <Text ta="center" fz={40} fw="bold" my={36}>
          {t("Register")}
        </Text>
        <Card className="login-card">
          <Text ta="center" fz={24} fw="bold">
            {t("Register to Flatmates")}
            <Image src={PATH_IMAGE.flatmateLogo1} alt="Flatmates" height={80} width={80} />
          </Text>
          <TextInput label="email" />
          <TextInput label="password" mb={32} />
          <Button>{t("Login")}</Button>
          <Text ta="end" fz={14} fw="bold">
            {t("If you have an account.")}{" "}
            <Link
              style={{
                color: "var(--mantine-color-primary)",
              }}
              href={{
                pathname: _PATH_FRONTEND.auth.invitationLogin,
                query: {
                  redirect: query.redirect,
                },
              }}
            >
              {t("Login")}
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
