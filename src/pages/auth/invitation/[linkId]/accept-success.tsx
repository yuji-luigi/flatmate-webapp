import React, { useEffect } from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetServerSidePropsContext } from "next";
import Image from "next/image";
import { Button } from "@mantine/core";
import { request } from "http";
import Link from "next/link";
import useRouterWithCustomQuery from "../../../../hooks/useRouterWithCustomQuery";
import Page from "../../../../components/Page";
import { useLocale } from "../../../../../hooks/useLocale";
import axiosInstance, { AxiosMeResponse } from "../../../../utils/axios-instance";
import { _PATH_API } from "../../../../path/path-api";
import { MeUser } from "../../../../types/models/space-model";
import { _PATH_FRONTEND } from "../../../../path/path-frontend";

const AcceptInvitationPage = ({ initialUser }: { initialUser: MeUser }) => {
  const { linkId } = useRouterWithCustomQuery().query;
  const { t } = useLocale();
  const userType = "Property Manager";
  const condo = "Luigi mansion";

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

export default AcceptInvitationPage;
