import { Container, Grid, Transition, Stack, Text, Group, Tabs, Box } from "@mantine/core";
import Image from "next/image";
import { CheckType, MaintenanceModel } from "../../../../types/models/maintenance-check-type";
import { CheckInputTabCard } from "./invoice-receipt-input/CheckInputTabCard";
import classes from "../../../../styles/global-useStyles.module.css";
import PostFeedCard, { PostFeedCardContent } from "../../../../components/posts/feed/PostFeedCard";
import { useCrudSelectors } from "../../../../redux/features/crud/crudSlice";
import { useCustomModalContext } from "../../../../context/modal-context/_ModalContext";
import { CardStyled } from "../../../../styles/card/CardStyled";
import { AdminCard } from "./AdminCard";
import { useLocale } from "../../../../../hooks/useLocale";
import { PageHeader } from "../../../../components/profile/CoverWithoutCard";
import ProfileCoverStatic from "../../../../components/profile/ProfileCoverStatic copy";

type Props = {
  pinOk: boolean;
  checkType: CheckType | null;
  setCheckType: (type: CheckType | null) => void;
};

export const MaintenanceCheckUploadSection = (props: Props) => {
  const { pinOk, checkType, setCheckType } = props;
  const { t } = useLocale("maintenance");
  const { crudDocument: maintenance } = useCrudSelectors<MaintenanceModel>("maintenances");
  const { openConfirmModal, closeModal } = useCustomModalContext();

  const handleOpenModal = () => {
    openConfirmModal({
      type: "custom",
      fullScreen: true,
      centered: true,
      // title: 'Maintenance',
      withinPortal: true,
      children: (
        <>
          <PostFeedCard data={maintenance} showFullText />
        </>
      ),
    });
  };
  return (
    <TransitionContainer pinOk={pinOk}>
      {pinOk && (
        <Grid align="stretch" gutter="md">
          <Grid.Col style={{ display: "flex", flexDirection: "column", gap: 16 }} span={12}>
            <PageHeader {...maintenance.space} description={maintenance.space.address} />
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
                  <PostFeedCardContent data={maintenance} popupFn={handleOpenModal} showFullText />
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
  );
};

function TransitionContainer({ pinOk, children }: { pinOk: boolean; children: React.ReactNode }) {
  return (
    <Container className={classes.container} style={{ marginInline: "auto" }}>
      <Transition mounted={pinOk} duration={500} transition="slide-up" timingFunction="ease-in-out">
        {(styles) => <div style={styles}>{children}</div>}
      </Transition>
    </Container>
  );
}

function Overview() {
  const { crudDocument: maintenance } = useCrudSelectors<MaintenanceModel>("maintenances");
  const { openConfirmModal, closeModal } = useCustomModalContext();

  const handleOpenModal = () => {
    openConfirmModal({
      type: "custom",
      fullScreen: true,
      centered: true,
      // title: 'Maintenance',
      withinPortal: true,
      children: (
        <>
          <PostFeedCard data={maintenance} showFullText />
        </>
      ),
    });
  };
  return (
    <Grid align="stretch" gutter="md">
      <Grid.Col style={{ display: "flex", flexDirection: "column", gap: 16 }} span={12}>
        <ProfileCoverStatic
          {...maintenance.space}
          description={maintenance.space.address}
          disableAvatar
        />
        <Grid>
          <Grid.Col span={{ sm: 6, xs: 12 }}>
            <CardStyled>
              <Text component="h3" ta="center" fw={800} fz={30}>
                Maintenance
              </Text>
              <PostFeedCard data={maintenance} popupFn={handleOpenModal} />
            </CardStyled>
          </Grid.Col>
          <Grid.Col span={{ sm: 6, xs: 12 }}>
            <Stack style={{ height: "100%" }}>
              <CardStyled>
                <CheckInputTabCard />
              </CardStyled>
            </Stack>
          </Grid.Col>
          <Grid.Col span={12}>
            <AdminCard admins={maintenance.space.admins} />
          </Grid.Col>
        </Grid>
        {/* </Grid.Col> */}
      </Grid.Col>
    </Grid>
  );
}

function BuildingInfo() {
  const { crudDocument: maintenance } = useCrudSelectors<MaintenanceModel>("maintenances");
  return (
    <div>
      <Text>Building: {maintenance.space.name}</Text>
      <Text>address: {maintenance.space.address}</Text>
      <Image
        width={500}
        height={500}
        src={maintenance.space.cover?.url || ""}
        alt={maintenance.space.name}
      />
    </div>
  );
}
