import React, { useEffect } from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetServerSidePropsContext } from "next";
import Image from "next/image";
import { Button } from "@mantine/core";
import useRouterWithCustomQuery from "../../../../hooks/useRouterWithCustomQuery";
import Page from "../../../../components/Page";
import { useLocale } from "../../../../../hooks/useLocale";
import axiosInstance from "../../../../utils/axios-instance";
import { _PATH_API } from "../../../../path/path-api";

const AcceptInvitationPage = () => {
  const { linkId } = useRouterWithCustomQuery().query;
  const { t } = useLocale();
  const userType = "Property Manager";
  const condo = "Luigi mansion";
  useEffect(() => {
    console.log(linkId);
    axiosInstance.post(_PATH_API.auth.acceptInvitation(linkId), {}).then((res) => {
      console.log(res);
    });
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
        <Button>{t("Go to dashboard")}</Button>
      </section>
    </Page>
  );
};

export default AcceptInvitationPage;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const translationObj = await serverSideTranslations(context.locale || "it", ["common"], null, [
    "it",
    "en",
  ]);
  return {
    props: {
      ...translationObj,
    },
  };
}
