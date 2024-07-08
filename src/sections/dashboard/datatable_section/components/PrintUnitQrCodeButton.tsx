"use client";
import { Box, Button, Group, Loader, Stack, Transition } from "@mantine/core";
import React, { useRef } from "react";
import { useCrudSelectors, useCrudSliceStore } from "../../../../redux/features/crud/crudSlice";
import classes from "../../../../styles/global-useStyles.module.css";
import { useCustomModalContext } from "../../../../context/modal-context/_ModalContext";
import useRouterWithCustomQuery from "../../../../hooks/useRouterWithCustomQuery";
import { SectionActionData } from "../../../../types/data/json/sections-json";
import { useLocale } from "../../../../../hooks/useLocale";
import { UnitInterface } from "../../../../types/models/unit-model";
import DownloadUnitPdfLink, { UnitsPdf } from "../../../../components/react-pdf/units/UnitsPdf";
import { pdf } from "@alexandernanberg/react-pdf-renderer";
import { IconDownload, IconPrinter } from "@tabler/icons-react";
import { HeadlessModal } from "../../../../components/modal/headless/HeadlessModal";
import { HeadlessModalTitle } from "../../../../components/modal/headless/HeadlessModalTitle";
import { useMediaQuery } from "@mantine/hooks";
import axiosInstance, { AxiosResDataGeneric } from "../../../../utils/axios-instance";
import { apiEndpoint } from "../../../../path/path-api";
import { AuthTokenModel } from "../../../../types/models/auth-token-model";
import HeaderSpaceSelect from "../../../../components/input/custom-inputs/HeaderSpaceSelect";
import { useCookieContext } from "../../../../context/CookieContext";
import { _PATH_FRONTEND } from "../../../../path/path-frontend";

export const PrintUnitQrCodeButton = ({ label, type, ...buttonProps }: SectionActionData) => {
  const { setCrudDocuments } = useCrudSliceStore();
  const { crudDocuments: units } = useCrudSelectors<UnitInterface>("units");
  const { openModal, closeModal, openConfirmModal, isOpenModal } = useCustomModalContext();
  const { t } = useLocale();
  const pdfRef = useRef();
  const fileInput = useRef<HTMLInputElement>(null);
  const {
    query: { entity },
  } = useRouterWithCustomQuery();

  const handleOpenModal = async () => {
    const rawAllUnitsOfBuildingWithQrcode = await axiosInstance.get<
      AxiosResDataGeneric<UnitWithAuthToken[]>
    >(apiEndpoint.units.withAuthToken);
    openModal({
      type: "headless",
      centered: true,
      size: "lg",
      children: (
        <OnClickHandlerModal
          fileRef={pdfRef}
          unitsWithQrCode={rawAllUnitsOfBuildingWithQrcode.data.data}
        />
      ),
    });
  };

  return (
    <>
      <Button
        variant="outline"
        onClick={handleOpenModal}
        className={classes.button}
        color="green"
        leftSection={
          <Group gap={4}>
            <IconDownload /> <IconPrinter />
          </Group>
        }
        {...buttonProps}
      >
        <h3>{t(label || "Print QR-Code With Address")}</h3>
      </Button>
    </>
  );
};

function OnClickHandlerModal({
  fileRef,
  unitsWithQrCode,
}: {
  fileRef: React.RefObject<any>;
  unitsWithQrCode: UnitWithAuthToken[];
}) {
  const isMobile = useMediaQuery("(max-width: 600px)");
  const { t } = useLocale("crud-section");
  const { currentSpace } = useCookieContext();
  return (
    <HeadlessModal>
      <Stack gap={24} py={32} px={16} pt={0}>
        <HeadlessModalTitle
          style={{ marginBottom: 8 }}
          title={t("OnClickHandlerModal-title")}
          subtitle={t("OnClickHandlerModal-desc")}
        />
        <HeaderSpaceSelect size="md" />
        <Transition
          mounted={!!currentSpace}
          duration={800}
          transition="slide-up"
          timingFunction="ease-in-out"
        >
          {(styles) => (
            <div style={styles} className="fieldset">
              <Box
                display="flex"
                style={{
                  flexDirection: isMobile ? "column" : "row",
                  gap: 8,
                  width: "100%",
                }}
              >
                <PrintUnitsButton units={unitsWithQrCode} />
                <DownloadUnitsButton fileRef={fileRef} units={unitsWithQrCode} />
              </Box>
            </div>
          )}
        </Transition>
      </Stack>
    </HeadlessModal>
  );
}

type UnitWithAuthToken = UnitInterface & { authToken: AuthTokenModel };
function PrintUnitsButton({ units }: { units: UnitWithAuthToken[] }) {
  const { t } = useLocale();
  // const { crudDocuments: units } = useCrudSelectors<UnitInterface>("units");

  const handlePrint = async () => {
    try {
      const rawAllUnitsOfBuildingWithQrcode = await axiosInstance.get<
        AxiosResDataGeneric<UnitWithAuthToken[]>
      >(apiEndpoint.units.withAuthToken);
      const blob = await pdf(
        <UnitsPdf
          sender={{
            name: "Sender Name",
            address: "Sender Address",
            state: "Sender State",
            postalCode: "Sender Postal Code",
          }}
          destinations={units.map((unit) => ({
            name: unit.ownerName || "Owner Name",
            address: unit.name,
            state: unit.space.address,
            postalCode: unit.space.name,
            authToken: unit.authToken,
            qrcodeUrl: _PATH_FRONTEND.authTokens.invitationWithoutEmail(unit.authToken),
          }))}
        />
      ).toBlob();
      // Create a URL for the Blob
      const url = URL.createObjectURL(blob);
      // Open the URL in a new window
      const newWindow = window.open(url, "_blank");
      if (newWindow) {
        newWindow.onload = () => {
          newWindow.focus(); // Ensure the window is in focus
          newWindow.print(); // Trigger the print dialog
        };
      }
    } catch (error) {
      console.error(error);
    }
    // Create a PDF document
  };
  return (
    <Button onClick={handlePrint} fullWidth variant="outline" leftSection={<IconPrinter />}>
      {t("Print")}
    </Button>
  );
}

function DownloadUnitsButton({
  fileRef,
  units,
}: {
  fileRef: React.RefObject<any>;
  units: UnitWithAuthToken[];
}) {
  const { t } = useLocale();

  return (
    <DownloadUnitPdfLink
      // loader={
      //   <Button disabled fullWidth leftSection={<Loader />}>
      //     {t("Download")}
      //   </Button>
      // }
      sender={{
        name: "Sender Name",
        address: "Sender Address",
        state: "Sender State",
        postalCode: "Sender Postal Code",
      }}
      destinations={units.map((unit) => ({
        name: unit.ownerName || "Owner Name",
        address: unit.name,
        state: unit.space.address,
        postalCode: unit.space.name,
        authToken: unit.authToken,
        qrcodeUrl: _PATH_FRONTEND.authTokens.invitationWithoutEmail(unit.authToken),
      }))}
    >
      <Button fullWidth leftSection={<IconDownload />}>
        {t("Download")}
      </Button>
    </DownloadUnitPdfLink>
  );
}
