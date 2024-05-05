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

// server side check
const CheckAcceptInvitationPage = ({ initialUser }: { initialUser: MeUser }) => {
  const { linkId } = useRouterWithCustomQuery().query;
  const { t } = useLocale();
  const userType = "Property Manager";
  const condo = "Luigi mansion";
  useEffect(() => {
    if (!linkId) return;
    if (initialUser) {
      // axiosInstance.post(_PATH_API.invitations(linkId)).then((res) => {
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

export default CheckAcceptInvitationPage;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const translationObj = await serverSideTranslations(context.locale || "it", ["common"], null, [
    "it",
    "en",
  ]);
  console.log(context.req.cookies);
  const { jwt } = context.req.cookies;
  const redirectUrl = encodeURIComponent(context.req.url || "no");
  const { linkId } = context.query;
  if (typeof linkId !== "string") {
    console.error("linkId is not a string");
    return {
      redirect: {
        destination: "404",
      },
    };
  }

  if (jwt && typeof context.query.linkId === "string") {
    // call invitations/accept/:linkId with jwt without calling me.
    try {
      await axiosInstance.get<AxiosMeResponse>(
        _PATH_API.invitations.acceptByLinkId(context.query.linkId),
        {
          headers: {
            cookie: context.req.headers.cookie,
          },
        }
      );
      return {
        redirect: {
          destination: _PATH_FRONTEND.auth.invitationAcceptSuccess(linkId),
          permanent: false,
        },
      };
    } catch (error) {
      // can be a different user jwt so redirect to invitation login
      console.error(error);
    }
  }
  //NOTE: if next does not provide correct url. this does not work. in dev it worked
  return {
    redirect: {
      destination: `${_PATH_FRONTEND.auth.invitationLogin}?redirect=${redirectUrl}`,
      permanent: false,
    },
  };
}
