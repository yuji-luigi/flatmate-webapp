import { Button, Group, createStyles } from '@mantine/core';
import React, { ChangeEvent, useCallback, useRef, useState } from 'react';
import { FlattenSectionData } from '../../../../data';
import { useCrudSliceStore } from '../../../../redux/features/crud/crudSlice';
import { Sections } from '../../../../types/general/data/sections-type';
import { useDrawerContext } from '../../../../context/DataTableDrawerContext';
import { dashboardStyle } from '../../../../styles/global-useStyles';
import { use_ModalContext } from '../../../../context/modal-context/_ModalContext';
import axiosInstance from '../../../../utils/axios-instance';
import { PATH_API } from '../../../../path/api-routes';
const useStyles = dashboardStyle;
const useStyles2 = createStyles({
  displayNone: {
    display: 'none',
  },
});
export const CrudTableButtons = ({
  section,
  entity,
}: {
  section: FlattenSectionData;
  entity: Sections;
}) => {
  const { selectCrudDocument } = useCrudSliceStore();
  const { openDrawer } = useDrawerContext();
  const { openConfirmModal } = use_ModalContext();
  const { classes } = useStyles();
  const { classes: classes2 } = useStyles2();

  const fileInput = useRef<HTMLInputElement>(null);

  const handleImportClicked = useCallback(() => {
    fileInput.current?.click();
  }, []);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const file = e.target?.files?.[0]; // get the file
    if (file) {
      handleOpenModal(file);
      e.target.value = ''; // reset the input
    }
  }, []);

  function handleOpenDrawer() {
    if (typeof entity !== 'undefined') {
      selectCrudDocument({ entity, document: null });
    }
    openDrawer();
  }

  function handleOpenModal(file: File) {
    openConfirmModal({
      type: 'confirm',
      labels: {
        confirm: 'Import',
        cancel: 'Cancel',
      },
      title: `Import excel file: ${file?.name}`,
      async onConfirm(data) {
        const formData = new FormData();
        formData.append('file', file);
        const rawRes = await axiosInstance.post(`${entity}/${PATH_API.importExcel}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log(rawRes.data.data);
      },
      children: undefined,
    });
  }
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
            color="error"
            onClick={handleImportClicked}
            className={classes.button}
          >
            <h3>{section.importButton}</h3>
          </Button>
          <input
            type="file"
            accept=".xlsx"
            ref={fileInput}
            className={classes2.displayNone}
            onChange={handleFileChange}
          />
        </>
      )}
    </Group>
  );
};