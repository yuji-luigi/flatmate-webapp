import React, { FC, ReactNode } from "react";
import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";
import { CrudTableButtons } from "./CrudTableButtons";
import { FrontendEntity } from "../../../../types/redux/CrudSliceInterfaces";
import { InviteButton } from "./customButtons/InviteButton";
import { SectionConfig } from "../../../../types/data/json/sections-json";

const buttons: Record<string, (props: any) => JSX.Element> = {
  custom: (props: any) => <>custom</>,
  default: CrudTableButtons,
  invite: InviteButton,
};

export const CrudTableButtonController = (props: {
  section: SectionConfig;
  entity: FrontendEntity;
}) => {
  const { section, entity } = props;
  const type = section.createButtonType || "default";
  const Button = buttons[type];
  return <Button {...props} label={props.section.createButton} />;
};
