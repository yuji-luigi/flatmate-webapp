import { Button } from "@mantine/core";
import React, { useCallback, useRef } from "react";
import { showNotification } from "@mantine/notifications";
import { useCrudSliceStore } from "../../../../redux/features/crud/crudSlice";
import classes from "../../../../styles/global-useStyles.module.css";
import { useCustomModalContext } from "../../../../context/modal-context/_ModalContext";
import axiosInstance from "../../../../utils/axios-instance";
import { PATH_API } from "../../../../path/path-api";
import { sleep } from "../../../../utils/helpers/helper-functions";
import useRouterWithCustomQuery from "../../../../hooks/useRouterWithCustomQuery";
import { Icons } from "../../../../data/icons/icons";
import { SectionActionData } from "../../../../types/data/json/sections-json";

export const ImportButton = ({ label, type, ...buttonProps }: SectionActionData) => {
  const { setCrudDocuments } = useCrudSliceStore();
  const { openConfirmModal } = useCustomModalContext();
  const fileInput = useRef<HTMLInputElement>(null);
  const {
    query: { entity },
  } = useRouterWithCustomQuery();

  const handleImportClicked = useCallback(() => {
    fileInput.current?.click();
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
    openConfirmModal({
      type: "confirm",
      labels: {
        confirm: "Import",
        cancel: "Cancel",
      },
      title: `Import excel file: ${file?.name}`,
      async onConfirm() {
        await confirmEvent(file);
      },
      children: undefined,
      opened: false,
    });
  }
  const confirmEvent = async (file: File) => {
    if (!entity) return;
    const formData = new FormData();
    formData.append("file", file);
    const rawRes = await axiosInstance.post(`${entity}/${PATH_API.importExcel}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    await sleep(1000);
    console.log(rawRes.data.data);
    showNotification({
      title: "Action Success",
      message: "Import success!!",
      color: "green",
    });
    setCrudDocuments({
      entity,
      documents: rawRes.data.data,
      totalDocuments: rawRes.data.totalDocuments,
    });
  };
  return (
    <>
      <Button
        variant="outline"
        onClick={handleImportClicked}
        className={classes.button}
        color="blue"
        leftSection={<Icons.upload />}
        {...buttonProps}
      >
        <h3>{label}</h3>
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
