import { ActionIcon } from "@mantine/core";
import { IconShare } from "@tabler/icons-react";
import React from "react";
import classes from "./ActionIconStyle.module.css";

export const ShareIconButton = () => {
  return (
    <ActionIcon className={classes.action}>
      <IconShare size="1rem" />
    </ActionIcon>
  );
};
