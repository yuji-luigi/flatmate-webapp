import { Button, ButtonProps, LoadingOverlay, Modal, TextInput, Transition } from "@mantine/core";
import React, { useCallback, useRef, useState } from "react";
import { showNotification } from "@mantine/notifications";
import { useCrudSliceStore } from "../../../../redux/features/crud/crudSlice";
import classes from "../../../../styles/global-useStyles.module.css";
import { useCustomModalContext } from "../../../../context/modal-context/_ModalContext";
import axiosInstance from "../../../../utils/axios-instance";
import { apiEndpointRootsEnum } from "../../../../path/path-api";
import { sleep } from "../../../../utils/helpers/helper-functions";
import useRouterWithCustomQuery from "../../../../hooks/useRouterWithCustomQuery";
import { Icons } from "../../../../data/icons/icons";
import { HeadlessModalTitle } from "../../../../components/modal/headless/HeadlessModalTitle";
import { t } from "i18next";
import { AlertCustom } from "../../../../components/alert/AlertCustom";
import SpaceSelectInput from "../../../../components/input/custom-inputs/SpaceSelectInput";
import HeaderSpaceSelect from "../../../../components/input/custom-inputs/HeaderSpaceSelect";
import { useCookieContext } from "../../../../context/CookieContext";
import { current } from "@reduxjs/toolkit";
import { DropzoneMantine } from "../../../../components/input/mantine-default/DropzoneMaintine";
import { DropzoneBase } from "../../../../components/input/mantine-default/DropzoneBase";
import { MS_EXCEL_MIME_TYPE } from "@mantine/dropzone";

export const ImportInhabitantUnitButton = ({
  label,
  ...other
}: ButtonProps & { label?: string }) => {
  const { openModal } = useCustomModalContext();
  const fileInput = useRef<HTMLInputElement>(null);

  const handleImportClicked = useCallback(() => {
    openModal({
      type: "headless",
      children: <SelectMainSpaceModal />,
    });
  }, []);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const file = e.target?.files?.[0]; // get the file
    if (file) {
      handleOpenModal(file);
      e.target.value = ""; // reset the input
    }
  }, []);

  function handleOpenModal(file: File) {
    return;
  }
  return (
    <>
      <Button
        variant="outline"
        onClick={handleImportClicked}
        className={classes.button}
        color="blue"
        leftSection={<Icons.upload />}
        {...other}
      >
        <h3>{label || "Import Units"}</h3>
      </Button>
      <input
        type="file"
        accept=".xlsx"
        ref={fileInput}
        className={classes.displayNone}
        onChange={handleFileChange}
      />
    </>
  );
};

function SelectMainSpaceModal() {
  const { isOpenModal: opened, closeModal: close, modalData } = useCustomModalContext();
  const { currentSpace } = useCookieContext();
  const [excel, setExcel] = useState<File | null>(null);
  const handleOnDrop = (files: File[]) => {
    console.log(files);
    setExcel(files[0]);
  };
  const modalTitle = currentSpace
    ? ` ${t("Import Units")}: ${currentSpace.name}`
    : t("Import Units");
  return (
    <Modal
      centered
      opened={opened}
      onClose={close}
      size="lg"
      withCloseButton={false}
      {...modalData}
    >
      <div className="invite-modal flex-column">
        <HeadlessModalTitle
          title={t("Import Units")}
          subtitle={currentSpace && currentSpace.name}
          icon={<Icons.propertyManagerBuilding size={60} />}
        />

        <HeaderSpaceSelect />
        <Transition
          mounted={!!currentSpace}
          duration={800}
          transition="slide-up"
          timingFunction="ease-in-out"
        >
          {(styles) => (
            <div style={styles} className="fieldset">
              <DropzoneBase onDropCallbackCallback={handleOnDrop} accept={MS_EXCEL_MIME_TYPE} />
            </div>
          )}
        </Transition>
        <Transition
          mounted={!!excel}
          duration={800}
          transition="slide-up"
          timingFunction="ease-in-out"
        >
          {(styles) => (
            <div style={styles} className="fieldset">
              <SubmitImportButton file={excel}>
                {t("Import")} {excel?.name}
              </SubmitImportButton>
            </div>
          )}
        </Transition>
        <LoadingOverlay visible={false} />
      </div>
    </Modal>
  );
}

function SubmitImportButton({ children, file }: { children: React.ReactNode; file?: File | null }) {
  const { setCrudDocuments } = useCrudSliceStore();
  const { closeModal } = useCustomModalContext();
  if (!file) {
    return <AlertCustom color="red">No file selected</AlertCustom>;
  }
  const handleImportInhabitantUnit = async () => {
    const formData = new FormData();
    formData.append("file", file);
    const rawRes = await axiosInstance.post(
      `inhabitant/${apiEndpointRootsEnum.importExcel}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    await sleep(1000);
    console.log(rawRes.data.data);
    showNotification({
      title: "Action Success",
      message: "Import success!!",
      color: "green",
    });
    setCrudDocuments({
      entity: "units",
      documents: rawRes.data.data,
      totalDocuments: rawRes.data.totalDocuments,
    });
    closeModal();
  };

  return <Button onClick={handleImportInhabitantUnit}>{children}</Button>;
}
