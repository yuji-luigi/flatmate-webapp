import { Group, Stack, Text } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { useRouter } from "next/router";
import { set } from "nprogress";
import { useState } from "react";
import { Icons } from "../../../data/icons/icons";
import { useLocale } from "../../../../hooks/useLocale";
import classes from "./NavbarVertical.module.css";
import axiosInstance, { AxiosResDataGeneric } from "../../../utils/axios-instance";
import { _PATH_API } from "../../../path/path-api";
import { useCookieContext } from "../../../context/CookieContext";
import { NOTIFICATIONS } from "../../../data/showNofification/notificationObjects";
import { _PATH_FRONTEND } from "../../../path/path-frontend";
import useAuth from "../../../../hooks/useAuth";
import { MeUser } from "../../../types/models/space-model";
import { sleep } from "../../../utils/helpers/helper-functions";

type SystemAdminNavProps = {};

export const SystemAdminSwitch = (props: SystemAdminNavProps) => {
  // return null;
  const { t } = useLocale();
  const { currentSpace } = useCookieContext();
  const [isLoading, setIsLoading] = useState(false);
  const { push } = useRouter();
  const { user, updateUser } = useAuth();
  const isSystemAdmin = user?.loggedAs === "system_admin";
  const text = isSystemAdmin ? t("Go back to normal user view") : t("Set up condominium");

  const handleCheckSystemAdmin = async () => {
    if (!currentSpace) return;
    try {
      setIsLoading(true);
      await sleep(300);
      if (!isSystemAdmin) {
        const rawRes = await axiosInstance.get<AxiosResDataGeneric<MeUser>>(
          _PATH_API.auth.systemAdminCheck(currentSpace._id)
        );
        updateUser(rawRes.data.data);
        await sleep(800);
        push(_PATH_FRONTEND.systemAdmin.root);
        return;
      }
      if (isSystemAdmin) {
        const rawRes = await axiosInstance.get<AxiosResDataGeneric<MeUser>>(
          _PATH_API.auth.systemAdminExit
        );
        updateUser(rawRes.data.data);
        await sleep(800);
        push(_PATH_FRONTEND.dashboard.root);
      }
    } catch (error) {
      showNotification({
        ...NOTIFICATIONS.ERROR.general(),
        message: t("You are not authorized to access this page"),
      });
    } finally {
      setIsLoading(false);
    }
  };
  // TODO: disable when isSubmitting/isLoading.
  return (
    <Stack align="start">
      <p>{t("Management")}</p>
      <Group
        className={classes.link}
        data-disable-all={isLoading}
        onClick={handleCheckSystemAdmin}
        align="center"
      >
        <Icons.setting className={classes.linkIcon} stroke={1.5} />
        {text}
      </Group>
    </Stack>
  );
};
