"use client";
import { Container, Transition, Text, Button } from "@mantine/core";
import { t } from "i18next";
import React, { useEffect, useState } from "react";
import Page from "../../../../components/Page";
import axiosInstance from "../../../../utils/axios-instance";
import { apiEndpoint } from "../../../../path/path-api";
import { showNotification, cleanNotifications } from "@mantine/notifications";
import { NOTIFICATIONS } from "../../../../data/showNofification/notificationObjects";
import { sleep } from "../../../../utils/helpers/helper-functions";
import { NotificationPageView } from "../../../../components/page-components/NotificationPageView";
import { PATH_IMAGE } from "../../../../lib/image-paths";
import Link from "next/link";
import { _PATH_FRONTEND } from "../../../../path/path-frontend";

const classes = {};
const maintenance = {};
type Props = {
  params: { linkId: string; authTokenType: string };
  searchParams: { [key: string]: string | string[] | undefined };
};
const EmailVerificationPage = ({ params, searchParams }: Props) => {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<any | null>(null);

  useEffect(() => {
    handleVerify();
  }, []);

  const handleVerify = async () => {
    try {
      const rawRes = await axiosInstance.post(
        apiEndpoint.verificationEmails.verifyByLinkId(params.linkId)
      );
      await sleep(750);
      cleanNotifications();
      showNotification(NOTIFICATIONS.SUCCESS.generic);
      setSuccess(true);
    } catch (error: any) {
      showNotification(NOTIFICATIONS.ERROR.general());
      setError(error.message || error);
    } finally {
      await sleep(750);
      cleanNotifications();
    }
  };
  if (error) {
    throw new Error(error);
  }
  return (
    <Page title="">
      <Container className="unnamed-container">
        <TransitionContainer mounted={!success}>
          <NotificationPageView
            title={t("Stiamo verificando email...")}
            description={t(
              "Grazie per aver registrato all FlatMates. Stiamo verificando la tua email."
            )}
            imageUrl={PATH_IMAGE.loading}
          />
        </TransitionContainer>
        <TransitionContainer mounted={success}>{success && <SuccessView />}</TransitionContainer>
      </Container>
    </Page>
  );
};

export default EmailVerificationPage;

function TransitionContainer({
  mounted,
  children,
}: {
  mounted: boolean;
  children: React.ReactNode;
}) {
  return (
    <Transition mounted={mounted} duration={500} transition="slide-up" timingFunction="ease-in-out">
      {(styles) => <div style={styles}>{children}</div>}
    </Transition>
  );
}

function SuccessView() {
  return (
    <NotificationPageView
      title={t("Email verificata")}
      description={t("La tua email è stata verificata con successo!")}
      imageUrl={PATH_IMAGE.success}
      imgHeight={400}
      imgWidth={300}
      CTA={
        <>
          <Text>{t("Ora puoi accedere al tuo account e iniziare a usare FlatMates.")}</Text>
          <Button component={Link} href={_PATH_FRONTEND.auth.login}>
            {t("Accedi")}
          </Button>
        </>
      }
    />
  );
}
