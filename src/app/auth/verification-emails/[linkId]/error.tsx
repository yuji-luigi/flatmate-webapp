"use client";
import React from "react";
import Page from "../../../../components/Page";
import { NotificationPageView } from "../../../../components/page-components/NotificationPageView";
import { PATH_IMAGE } from "../../../../lib/image-paths";
import { Alert, Container } from "@mantine/core";
import { Icons } from "../../../../data/icons/icons";

const ErrorVerificationEmail = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
  return (
    <Page title="Errore verifica email" className="center height-100dvh">
      <Container className="unnamed-container">
        <Alert color="red" style={{ width: "100%" }} icon={<Icons.alert />}>
          ERRORE: errore dal server
        </Alert>
        <NotificationPageView
          title={"Errore durante verifica della email"}
          description={
            error.message ||
            "Something happened the server... If you think this is an error contact support."
          }
          imageUrl={PATH_IMAGE.error}
        />
      </Container>
    </Page>
  );
};

export default ErrorVerificationEmail;
