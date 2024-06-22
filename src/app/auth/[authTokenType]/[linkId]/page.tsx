"use client";
import { Grid, Tabs, Container, Transition } from "@mantine/core";
import { t } from "i18next";
import React, { useState } from "react";
import { PageHeader } from "../../../../components/profile/CoverWithoutCard";
import { CheckInputTabCard } from "../../../../sections/nonce-check/m-file-upload/verified-m-file/invoice-receipt-input/CheckInputTabCard";
import { MaintenanceTab } from "../../../../sections/nonce-check/m-file-upload/verified-m-file/maintenance-tab/MaintenanceTab";
import { PinVerificationCard } from "../../../_component/card/PinVerificationCard";

const classes = {};
const maintenance = {};
type Props = {
  params: { linkId: string; authTokenType: string };
  searchParams: { [key: string]: string | string[] | undefined };
};
const EmailVerificationPage = ({ params, searchParams }: Props) => {
  const [pinOk, setPinOk] = useState<boolean>(false);
  const { linkId, authTokenType } = params;
  return (
    <>
      <PinVerificationCard pinOk={pinOk} setPinOk={setPinOk} />
      <TransitionContainer pinOk={pinOk}>
        {pinOk && (
          <Grid align="stretch" gutter="md">
            <Grid.Col style={{ display: "flex", flexDirection: "column", gap: 16 }} span={12}>
              <PageHeader space={maintenance.space} maintenance={maintenance} />
              <Tabs
                classNames={{
                  tab: "default-tab",
                  list: "default-tab-list",
                  panel: "default-tab-panel",
                  root: "default-tab-root",
                  tabLabel: "default-tab-label",
                  tabSection: "default-tab-section",
                }}
                defaultValue="maintenance"
              >
                <Tabs.List>
                  <Tabs.Tab value="maintenance">{t("Maintenance")}</Tabs.Tab>
                  <Tabs.Tab value="invoice">{t("Invoice")}</Tabs.Tab>
                  <Tabs.Tab value="building">{t("About Building")}</Tabs.Tab>
                  <Tabs.Tab value="overview">{t("Overview")}</Tabs.Tab>
                </Tabs.List>
                <Tabs.Panel value="maintenance">
                  <div>
                    <MaintenanceTab maintenance={maintenance} />
                  </div>
                </Tabs.Panel>
                <Tabs.Panel value="invoice">
                  <CheckInputTabCard />
                </Tabs.Panel>
                <Tabs.Panel value="building">
                  <BuildingInfo />
                </Tabs.Panel>
                <Tabs.Panel value="overview">
                  <Overview />
                </Tabs.Panel>
              </Tabs>
            </Grid.Col>
          </Grid>
        )}
      </TransitionContainer>
    </>
  );
};

export default EmailVerificationPage;

function TransitionContainer({ pinOk, children }: { pinOk: boolean; children: React.ReactNode }) {
  return (
    <Container className={classes.container} style={{ marginInline: "auto" }}>
      <Transition mounted={pinOk} duration={500} transition="slide-up" timingFunction="ease-in-out">
        {(styles) => <div style={styles}>{children}</div>}
      </Transition>
    </Container>
  );
}
