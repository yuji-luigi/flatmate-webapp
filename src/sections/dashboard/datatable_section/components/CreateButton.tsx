import { Button, Group, MantineColor } from "@mantine/core";
import React, { useCallback, useRef } from "react";
import { showNotification } from "@mantine/notifications";
import { FlattenSectionData } from "../../../../json/nav-config";
import { useCrudSliceStore } from "../../../../redux/features/crud/crudSlice";
import { useDrawerContext } from "../../../../context/DataTableDrawerContext";
import classes from "../../../../styles/global-useStyles.module.css";
import { useCustomModalContext } from "../../../../context/modal-context/_ModalContext";
import axiosInstance from "../../../../utils/axios-instance";
import { apiEndpointRootsEnum } from "../../../../path/path-api";
import { sleep } from "../../../../utils/helpers/helper-functions";
import { FrontendEntity } from "../../../../types/redux/CrudSliceInterfaces";
import { SectionActionData, SectionConfig } from "../../../../types/data/json/sections-json";
import useRouterWithCustomQuery from "../../../../hooks/useRouterWithCustomQuery";
import { Icons } from "../../../../data/icons/icons";

export const CreateButton = ({ label, type, ...props }: SectionActionData) => {
  const { selectCrudDocument, setCrudDocuments } = useCrudSliceStore();
  const { openDrawer } = useDrawerContext();
  const { openConfirmModal } = useCustomModalContext();
  const {
    query: { entity },
  } = useRouterWithCustomQuery();

  function handleOpenDrawer() {
    if (typeof entity !== "undefined") {
      selectCrudDocument({ entity, document: {} });
    }
    openDrawer();
  }

  const confirmEvent = async (file: File) => {
    if (!entity) return;
    const formData = new FormData();
    formData.append("file", file);
    const rawRes = await axiosInstance.post(
      `${entity}/${apiEndpointRootsEnum.importExcel}`,
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
      entity,
      documents: rawRes.data.data,
      totalDocuments: rawRes.data.totalDocuments,
    });
  };
  return (
    <Button
      onClick={handleOpenDrawer}
      className={classes.button}
      leftSection={<Icons.plus />}
      variant="outline"
      color="orange"
      {...props}
    >
      <h3>{label}</h3>
    </Button>
  );
};
