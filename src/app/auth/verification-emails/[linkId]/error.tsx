"use client";
import React from "react";
import Page from "../../../../components/Page";
import { NotificationPageView } from "../../../../components/page-components/NotificationPageView";
import { PATH_IMAGE } from "../../../../lib/image-paths";
import { Alert, Button, Container } from "@mantine/core";
import { Icons } from "../../../../data/icons/icons";
import { LoginButton } from "../../../../layouts/homepage/nav/header/LoginButton";
import { useLocale } from "../../../../../hooks/useLocale";
import Link from "next/link";
import { _PATH_FRONTEND } from "../../../../path/path-frontend";

const ErrorVerificationEmail = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
  const { t } = useLocale();
  return (
    <Page title="Errore verifica email" className="center height-100dvh">
      <Container className="unnamed-container">
        {/* <Alert color="red" style={{ width: "100%" }} icon={<Icons.alert />}>
          ERRORE: errore dal server
        </Alert> */}
        <NotificationPageView
          title={"Errore durante verifica della email. Please read description below."}
          description={
            error.message ||
            "Something happened the server... If you think this is an error contact support."
          }
          imageUrl={PATH_IMAGE.error}
          CTA={
            <Button component={Link} href={_PATH_FRONTEND.auth.login}>
              {t("Login")}
            </Button>
          }
        />
      </Container>
    </Page>
  );
};

export default ErrorVerificationEmail;
