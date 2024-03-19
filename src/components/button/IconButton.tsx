import { ActionIcon } from "@mantine/core";
import React from "react";

type IconButtonProps = {
  children?: React.ReactNode;
  icon: React.ReactNode;
};
export const IconButton = (props: IconButtonProps) => {
  const { icon } = props;
  return <ActionIcon>{icon}</ActionIcon>;
};
