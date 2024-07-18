import { useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import LoadingScreen from "../components/screen/LoadingScreen";
import { useRouter } from "next/router";
import { _PATH_FRONTEND } from "../path/path-frontend";
import { Container } from "@mantine/core";
import { sleep } from "../utils/helpers/helper-functions";

const LogoutPage = () => {
  const { logout } = useAuth();
  const { push } = useRouter();
  useEffect(() => {
    handleLogout();
  }, []);
  const handleLogout = async () => {
    logout();
    await sleep(750);
    push(_PATH_FRONTEND.auth.login);
  };
  // TODO: re-style this page
  return (
    <>
      <LoadingScreen />
    </>
  );
};

export default LogoutPage;
