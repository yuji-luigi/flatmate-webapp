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
import { pdf } from "@react-pdf/renderer";
import { IconDownload, IconPrinter } from "@tabler/icons-react";
import { HeadlessModal } from "../../../../components/modal/headless/HeadlessModal";
import { HeadlessModalTitle } from "../../../../components/modal/headless/HeadlessModalTitle";
import { useMediaQuery } from "@mantine/hooks";
import axiosInstance, { AxiosResDataGeneric } from "../../../../utils/axios-instance";
import { _PATH_API } from "../../../../path/path-api";
import { AuthTokenModel } from "../../../../types/models/auth-token-model";
import HeaderSpaceSelect from "../../../../components/input/custom-inputs/HeaderSpaceSelect";
import { useCookieContext } from "../../../../context/CookieContext";

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

  const handleOpenModal = () => {
    openModal({
      type: "headless",
      centered: true,
      size: "lg",
      children: <OnClickHandlerModal fileRef={pdfRef} />,
    });
  };
  // const handleOpenModal = useReactToPrint({
  //   documentTitle: "condominio",
  //   content: () => pdfRef.current,
  // });

  // return (
  //   <DownloadUnitPdfLink
  //     sender={{
  //       name: "Sender Name",
  //       address: "Sender Address",
  //       state: "Sender State",
  //       postalCode: "Sender Postal Code",
  //     }}
  //     destinations={units.map((unit) => ({
  //       name: unit.ownerName || "Owner Name",
  //       address: unit.name,
  //       state: unit.space.address,
  //       postalCode: unit.space.name,
  //     }))}
  //   />
  // );

  // const handleOpenAndPrint = async () => {
  //   // Create a PDF document
  //   const blob = await pdf(
  //     <UnitsPdf
  //       sender={{
  //         name: "Sender Name",
  //         address: "Sender Address",
  //         state: "Sender State",
  //         postalCode: "Sender Postal Code",
  //       }}
  //       destinations={units.map((unit) => ({
  //         name: unit.ownerName || "Owner Name",
  //         address: unit.name,
  //         state: unit.space.address,
  //         postalCode: unit.space.name,
  //       }))}
  //     />
  //   ).toBlob();

  //   // Create a URL for the Blob
  //   const url = URL.createObjectURL(blob);

  //   // Open the URL in a new window
  //   const newWindow = window.open(url, "_blank");

  //   if (newWindow) {
  //     newWindow.onload = () => {
  //       newWindow.focus(); // Ensure the window is in focus
  //       newWindow.print(); // Trigger the print dialog
  //     };
  //   }
  // };
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

function OnClickHandlerModal({ fileRef }: { fileRef: React.RefObject<any> }) {
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
                <PrintUnitsButton />
                <DownloadUnitsButton fileRef={fileRef} />
              </Box>
            </div>
          )}
        </Transition>
      </Stack>
    </HeadlessModal>
  );
}

type UnitWithAuthToken = UnitInterface & { authToken: AuthTokenModel };
function PrintUnitsButton() {
  const { t } = useLocale();

  const { crudDocuments: units } = useCrudSelectors<UnitInterface>("units");
  const handlePrint = async () => {
    const rawAllUnitsOfBuildingWithQrcode = await axiosInstance.get<
      AxiosResDataGeneric<UnitWithAuthToken[]>
    >(_PATH_API.units.withAuthToken);
    // Create a PDF document
    const blob = await pdf(
      <UnitsPdf
        sender={{
          name: "Sender Name",
          address: "Sender Address",
          state: "Sender State",
          postalCode: "Sender Postal Code",
        }}
        destinations={rawAllUnitsOfBuildingWithQrcode.data.data.map((unit) => ({
          name: unit.ownerName || "Owner Name",
          address: unit.name,
          state: unit.space.address,
          postalCode: unit.space.name,
          authToken: unit.authToken,
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
  };
  return (
    <Button onClick={handlePrint} fullWidth variant="outline" leftSection={<IconPrinter />}>
      {t("Print")}
    </Button>
  );
}

function DownloadUnitsButton({ fileRef }: { fileRef: React.RefObject<any> }) {
  const { t } = useLocale();
  const { crudDocuments: units } = useCrudSelectors<UnitInterface>("units");
  return (
    <DownloadUnitPdfLink
      loader={
        <Button disabled fullWidth leftSection={<Loader />}>
          {t("Download")}
        </Button>
      }
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
      }))}
    >
      <Button fullWidth leftSection={<IconDownload />}>
        {t("Download")}
      </Button>
    </DownloadUnitPdfLink>
  );
}
