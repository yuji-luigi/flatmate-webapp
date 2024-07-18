"use client";
import { useEffect } from "react";
import Image from "next/image";
import { Button } from "@mantine/core";
import Link from "next/link";
import Page from "../../../../components/Page";
import { useLocale } from "../../../../../hooks/useLocale";
import { MeUser } from "../../../../types/models/space-model";
import { _PATH_FRONTEND } from "../../../../path/path-frontend";

// server side check
export const CheckAcceptInvitationPageView = ({
  initialUser,
  linkId,
}: {
  initialUser: MeUser;
  linkId: string;
}) => {
  const { t } = useLocale();
  // const t = (key: string) => key;
  const userType = "Property Manager";
  const condo = "Luigi mansion";
  const { loggedAs } = initialUser;
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
        <Button component={Link} href={_PATH_FRONTEND.dashboard.home(loggedAs)}>
          {t("Go to dashboard")}
        </Button>
      </section>
    </Page>
  );
};
