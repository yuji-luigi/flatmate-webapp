import { Menu } from "@mantine/core";
import { useLocale } from "../../../../hooks/useLocale";
import { Icons } from "../../../data/icons/icons";
import { _PATH_FRONTEND } from "../../../path/path-frontend";
import classes from "./ProfilePopover.module.css";
import { _PATH_API } from "../../../path/path-api";
import axiosInstance from "../../../utils/axios-instance";
import useAuth from "../../../../hooks/useAuth";
type MenuSuperAdminSwitchProps = {};

export const MenuSuperAdminSwitch: React.FC<MenuSuperAdminSwitchProps> = (
  props: MenuSuperAdminSwitchProps
) => {
  const { t } = useLocale();
  const { user, reInitialize } = useAuth();
  if (!user?.isSuperAdmin) return null;
  const loggedAsSA = user.loggedAs === "super_admin";
  const handleToggleSuperAdmin = async () => {
    if (user.isSuperAdmin) {
      await axiosInstance.patch(_PATH_API.auth.toggleSuperAdmin);
      reInitialize();
    }
  };
  return (
    <Menu.Item
      onClick={handleToggleSuperAdmin}
      className={classes.link}
      leftSection={<Icons.settings />}
    >
      {loggedAsSA ? t("Normal menu") : t("Super Admin menu")}
    </Menu.Item>
  );
};
