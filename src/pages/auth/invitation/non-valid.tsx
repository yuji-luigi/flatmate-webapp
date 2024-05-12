import Image from "next/image";
import { Button, Text } from "@mantine/core";
import Link from "next/link";
import useRouterWithCustomQuery from "../../../hooks/useRouterWithCustomQuery";
import Page from "../../../components/Page";
import { useLocale } from "../../../../hooks/useLocale";
import { MeUser } from "../../../types/models/space-model";
import { _PATH_FRONTEND } from "../../../path/path-frontend";
import { SimpleOneSectionLayout } from "../../../layouts/simple-one-section/SimpleOneSectionLayout";
import { ReactElement } from "react";

const InvitationNoMoreValidPage = ({ initialUser }: { initialUser: MeUser }) => {
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
          src="/images/x.png"
          width={400}
          height={200}
          style={{ objectFit: "contain" }}
          alt="accept request"
        />
        <Text fz={24} variant="h2">
          {t("Invitation is expired or not valid anymore")}
        </Text>
        <Text variant="h5">
          {t("You may have accepted or declined already. Please ask administrator")}
        </Text>
        <Button component={Link} href={_PATH_FRONTEND.dashboard.home}>
          {t("Go to dashboard")}
        </Button>
      </section>
    </Page>
  );
};

export default InvitationNoMoreValidPage;
InvitationNoMoreValidPage.getLayout = (page: ReactElement) => (
  <SimpleOneSectionLayout>{page}</SimpleOneSectionLayout>
);
