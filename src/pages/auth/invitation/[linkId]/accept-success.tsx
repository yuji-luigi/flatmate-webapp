import React, { ReactElement, useEffect } from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetServerSidePropsContext } from "next";
import Image from "next/image";
import { Box, Button } from "@mantine/core";
import { request } from "http";
import Link from "next/link";
import useRouterWithCustomQuery from "../../../../hooks/useRouterWithCustomQuery";
import Page from "../../../../components/Page";
import { useLocale } from "../../../../../hooks/useLocale";
import axiosInstance, {
  AxiosMeResponse,
  AxiosResDataGeneric,
} from "../../../../utils/axios-instance";
import { _PATH_API } from "../../../../path/path-api";
import { MeUser } from "../../../../types/models/space-model";
import { _PATH_FRONTEND } from "../../../../path/path-frontend";
import { InvitationAuth } from "../../../../types/models/invitation-model";
import { SimpleOneSectionLayout } from "../../../../layouts/simple-one-section/SimpleOneSectionLayout";

const AcceptInvitationPage = ({ initialUser }: { initialUser: MeUser }) => {
  const { t } = useLocale();
  const userType = "Property Manager";
  const condo = "Luigi mansion";

  return (
    <Page title={t("Invitation")}>
      <section>
        <Box
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
        </Box>
      </section>
    </Page>
  );
};

AcceptInvitationPage.getLayout = (page: ReactElement) => (
  <SimpleOneSectionLayout>{page}</SimpleOneSectionLayout>
);
export default AcceptInvitationPage;

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const translations = await serverSideTranslations(context.locale || "en", ["common", "auth"]);
  try {
    const { linkId } = context.query;
    if (typeof linkId !== "string") {
      throw new Error("Invitation link is not valid");
    }
    const rawInvitation = await axiosInstance.get<AxiosResDataGeneric<InvitationAuth | null>>(
      _PATH_API.invitations.byLinkId(linkId)
    );
    if (rawInvitation.data.data) {
      return {
        props: {
          invitation: rawInvitation.data.data,
          ...translations,
        },
      };
    }
    throw new Error("Invitation is not valid or expired");
  } catch (error: any) {
    console.error(error);
    const msg = encodeURI(error.message || error);
    return {
      redirect: {
        destination: `/error?message=${msg}`,
        permanent: false,
      },
    };
  }
};
