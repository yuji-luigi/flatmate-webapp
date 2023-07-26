import { Button, Group } from '@mantine/core';
import React from 'react';
import { FlattenSectionData } from '../../../../data';
import { useCrudSliceStore } from '../../../../redux/features/crud/crudSlice';
import { Sections } from '../../../../types/general/data/sections-type';
import { useDrawerContext } from '../../../../context/DataTableDrawerContext';
import { dashboardStyle } from '../../../../styles/global-useStyles';
const useStyles = dashboardStyle;

export const CrudButtons = ({
  section,
  entity,
}: {
  section: FlattenSectionData;
  entity: Sections;
}) => {
  const { selectCrudDocument } = useCrudSliceStore();
  const { openDrawer } = useDrawerContext();
  const { classes } = useStyles();

  function handleOpenDrawer() {
    if (typeof entity !== 'undefined') {
      selectCrudDocument({ entity, document: null });
    }
    openDrawer();
  }
  return (
    <Group>
      {section.createButton && (
        <Button onClick={handleOpenDrawer} className={classes.button}>
          <h3>{section.createButton}</h3>
        </Button>
      )}
      {section.importButton && (
        <Button
          variant="outline"
          color="error"
          onClick={handleOpenDrawer}
          className={classes.button}
        >
          <h3>{section.importButton}</h3>
        </Button>
      )}
    </Group>
  );
};
