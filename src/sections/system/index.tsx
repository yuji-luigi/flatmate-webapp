import { useLocale } from "../../../hooks/useLocale";
import { InviteGrid } from "./InviteGrid";
import { DashboardTopHeader } from "../dashboard/dashboard_top/components/DashboardTopHeader";

export const SystemTop = () => {
  const { t } = useLocale();
  return (
    <>
      <DashboardTopHeader header="System Admin Dashboard" />
      <div className="grid-auto-fill">
        <InviteGrid userType="property_manager">{t("Invite Property Manager")}</InviteGrid>
        <InviteGrid userType="maintainer">{t("Invite Maintainer")}</InviteGrid>
        <InviteGrid userType="inhabitant">{t("Register Users to condominium")}</InviteGrid>
      </div>
    </>
  );
};
