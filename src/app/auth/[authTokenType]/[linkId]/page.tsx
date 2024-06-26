"use client";
import { Grid, Tabs, Container, Transition } from "@mantine/core";
import { t } from "i18next";
import React, { useEffect, useState } from "react";
import { PageHeader } from "../../../../components/profile/CoverWithoutCard";
import { CheckInputTabCard } from "../../../../sections/nonce-check/m-file-upload/verified-m-file/invoice-receipt-input/CheckInputTabCard";
import { MaintenanceTab } from "../../../../sections/nonce-check/m-file-upload/verified-m-file/maintenance-tab/MaintenanceTab";
import { PinVerificationCard } from "../../../_component/card/PinVerificationCard";
import Page from "../../../../components/Page";
import axios from "axios";
import axiosInstance from "../../../../utils/axios-instance";
import { apiEndpoint } from "../../../../path/path-api";
import { showNotification } from "@mantine/notifications";
import { NOTIFICATIONS } from "../../../../data/showNofification/notificationObjects";

const classes = {};
const maintenance = {};
type Props = {
  params: { linkId: string; authTokenType: string };
  searchParams: { [key: string]: string | string[] | undefined };
};
const EmailVerificationPage = ({ params, searchParams }: Props) => {
  const [pinOk, setPinOk] = useState<boolean>(false);

  useEffect(() => {
    pinOk &&
      axiosInstance
        .get(apiEndpoint.authTokens.checkByCookie)
        .then((_) => showNotification(NOTIFICATIONS.SUCCESS.generic));
  }, [pinOk]);

  return (
    <Page>
      <Container className="unnamed-container">
        <TransitionContainer mounted={!pinOk}>
          <PinVerificationCard pinOk={pinOk} setPinOk={setPinOk} />
        </TransitionContainer>
        <TransitionContainer mounted={pinOk}>
          {pinOk && (
            <Grid align="stretch" gutter="md">
              pin valid
            </Grid>
          )}
        </TransitionContainer>
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
