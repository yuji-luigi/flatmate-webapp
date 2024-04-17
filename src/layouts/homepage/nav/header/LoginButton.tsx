import React from "react";
import { Button, ButtonProps } from "@mantine/core";
import Link from "next/link";
import { NextRequest } from "next/server";
import { useRouter } from "next/router";
import { PATH_CLIENT } from "../../../../path/path-frontend";
import useAuth from "../../../../../hooks/useAuth";
import { useCookieContext } from "../../../../context/CookieContext";
import { _PATH_API } from "../../../../path/path-api";
import axiosInstance, { AxiosResDataGeneric } from "../../../../utils/axios-instance";
import { MeUser } from "../../../../types/models/space-model";

const isChoosePage = (path: string) =>
  path === PATH_CLIENT.chooseRootSpace || path === PATH_CLIENT.chooseOrganization;

/**
 *
 * @description regular login button. color dark
 */
export const LoginButton = (props?: ButtonProps) => {
  const { pathname, push } = useRouter();
  const { user, updateUser } = useAuth();
  const handleLogin = async () => {
    if (user?.loggedAs === "system_admin") {
      const rawRes = await axiosInstance.get<AxiosResDataGeneric<MeUser>>(
        _PATH_API.auth.systemAdminExit
      );
      updateUser(rawRes.data.data);
    }
    push(PATH_CLIENT.login);
  };
  if (pathname === PATH_CLIENT.login) {
    return null;
  }
  return (
    <Button onClick={handleLogin} variant={props?.variant || "default"}>
      Log in
    </Button>
  );
};
