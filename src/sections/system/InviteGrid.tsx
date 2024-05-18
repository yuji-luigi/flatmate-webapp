import React, { ReactNode } from "react";
import { UserRoles, UserType } from "../../lib/enums";
import { useCrudSelectors } from "../../redux/features/crud/crudSlice";
import { UserByUserType } from "../../types/models/user-by-user-type";
import { InviteButton } from "../dashboard/datatable_section/components/customButtons/InviteButton";
import classes from "./InviteGrid.module.css";
import { useLocale } from "../../../hooks/useLocale";

export const InviteGrid = ({ children, userType }: { children: ReactNode; userType: UserType }) => {
  const { t } = useLocale();
  const { crudDocuments, crudStatus } = useCrudSelectors<UserByUserType>(userType);
  if (crudStatus === "loading") return <div>Loading...</div>;
  const userTypeText = t(`$${userType}`);
  const message =
    crudDocuments?.length === 0
      ? `${userTypeText} ${t("InviteGridNotRegistered")}`
      : `${t("There are")} ${crudDocuments.length} ${userTypeText}`;
  return (
    <div className={classes["grid-item"]}>
      {message}
      <InviteButton className={classes["invite-button"]} label="Invite!" entity={userType} />
    </div>
  );
};
