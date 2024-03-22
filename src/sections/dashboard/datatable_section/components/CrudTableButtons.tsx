import { Button, Group, LoadingOverlay } from "@mantine/core";
import React, { ChangeEvent, useCallback, useRef, useState } from "react";
import { showNotification } from "@mantine/notifications";
import { FlattenSectionData } from "../../../../data";
import { useCrudSliceStore } from "../../../../redux/features/crud/crudSlice";
import { Sections } from "../../../../types/general/data/sections-type";
import { useDrawerContext } from "../../../../context/DataTableDrawerContext";
import classes from "../../../../styles/global-useStyles.module.css";
import { useCustomModalContext } from "../../../../context/modal-context/_ModalContext";
import axiosInstance from "../../../../utils/axios-instance";
import { PATH_API } from "../../../../path/path-api";
import { sleep } from "../../../../utils/helpers/helper-functions";

export const CrudTableButtons = ({
  section,
  entity,
}: {
  section: FlattenSectionData;
  entity: Sections;
}) => {
  const { selectCrudDocument, setCrudDocuments } = useCrudSliceStore();
  const { openDrawer } = useDrawerContext();
  const { openConfirmModal } = useCustomModalContext();
  const fileInput = useRef<HTMLInputElement>(null);

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

  function handleOpenDrawer() {
    if (typeof entity !== "undefined") {
      selectCrudDocument({ entity, document: null });
    }
    openDrawer();
  }

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
      onClose(): void {},
    });
  }
  const confirmEvent = async (file: File) => {
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
    <Group>
      {section.createButton && (
        <Button onClick={handleOpenDrawer} className={classes.button}>
          <h3>{section.createButton}</h3>
        </Button>
      )}
      {section.importButton && (
        <>
          <Button
            variant="outline"
            color="orange"
            onClick={handleImportClicked}
            className={classes.button}
          >
            <h3>{section.importButton}</h3>
          </Button>
          <input
            type="file"
            accept=".xlsx"
            ref={fileInput}
            className={classes.displayNone}
            onChange={handleFileChange}
          />
        </>
      )}
    </Group>
  );
};
