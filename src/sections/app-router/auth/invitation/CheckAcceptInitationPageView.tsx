"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import { Button } from "@mantine/core";
import { request } from "http";
import Link from "next/link";
import useRouterWithCustomQuery from "../../../../hooks/useRouterWithCustomQuery";
import Page from "../../../../components/Page";
import { useLocale } from "../../../../../hooks/useLocale";
import axiosInstance, {
  AxiosMeResponse,
  AxiosResDataGeneric,
} from "../../../../utils/axios-instance";
import { apiEndpoint } from "../../../../path/path-api";
import { MeUser } from "../../../../types/models/space-model";
import { _PATH_FRONTEND } from "../../../../path/path-frontend";
import { InvitationAuth } from "../../../../types/models/invitation-model";

// server side check
export const CheckAcceptInvitationPageView = ({ initialUser }: { initialUser: MeUser }) => {
  const { linkId } = useRouterWithCustomQuery().query;
  const { t } = useLocale();
  const userType = "Property Manager";
  const condo = "Luigi mansion";
  useEffect(() => {
    if (!linkId) return;
    if (initialUser) {
      // axiosInstance.post(apiEndpoint.invitations(linkId)).then((res) => {
      //   console.log(res);
      // });
    }
  }, [linkId]);
  return (
    <Page title={t("Invitation")}>
      <section
        style={{
          padding: "var(--padding-main)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "var(--flex-gap)",
          margin: "auto",
          width: "fit-content",
        }}
      >
        <Image
          src="/images/success.png"
          width={400}
          height={200}
          style={{ objectFit: "contain" }}
          alt="accept request"
        />
        <h3>
          {t("Now you are")} {userType} {t("of")} {condo}{" "}
        </h3>
        <Button component={Link} href={_PATH_FRONTEND.dashboard.home}>
          {t("Go to dashboard")}
        </Button>
      </section>
    </Page>
  );
};
