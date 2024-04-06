import { Group, Stack, Text } from "@mantine/core";
import Link from "next/link";
import { current } from "@reduxjs/toolkit";
import { showNotification } from "@mantine/notifications";
import { useRouter } from "next/router";
import { Icons } from "../../../data/icons/icons";
import { useLocale } from "../../../../hooks/useLocale";
import classes from "./NavbarVertical.module.css";
import axiosInstance from "../../../utils/axios-instance";
import { _PATH_API } from "../../../path/path-api";
import { useCookieContext } from "../../../context/CookieContext";
import { NOTIFICATIONS } from "../../../data/showNofification/notificationObjects";
import { _PATH_FRONTEND } from "../../../path/path-frontend";

type SystemAdminNavProps = {};

export const SystemAdminSwitch = (props: SystemAdminNavProps) => {
  const { t } = useLocale();
  const { currentSpace } = useCookieContext();
  const { push } = useRouter();
  const handleCheckSystemAdmin = async () => {
    if (!currentSpace) return;
    try {
      await axiosInstance.get(`${_PATH_API.auth.systemAdmin}/${currentSpace?._id}`);
      push(_PATH_FRONTEND.systemAdmin.root);
    } catch (error) {
      showNotification({
        ...NOTIFICATIONS.ERROR.general(),
        message: t("You are not authorized to access this page"),
      });
    }
  };
  return (
    <Stack align="start">
      <p>{t("Management")}</p>
      <Text className={classes.link} onClick={handleCheckSystemAdmin}>
        <Group align="center">
          <Icons.setting className={classes.linkIcon} stroke={1.5} />
          {t("Set up condominium")}
        </Group>
      </Text>
    </Stack>
  );
};
