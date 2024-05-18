import { setCookie } from "cookies-next";
import jwtDecode from "jwt-decode";
// routes
import { PATH_AUTH } from "../path/path-api";
//
import axiosInstance from "./axios-instance";

// ----------------------------------------------------------------------

const isValidToken = (accessToken: string) => {
  if (!accessToken) {
    return false;
  }
  const decoded: any = jwtDecode(accessToken);

  const currentTime = Date.now() / 1000;

  return decoded.exp > currentTime;
};

const handleTokenExpired = (exp: number) => {
  let expiredTimer;

  const currentTime = Date.now();

  // Test token expires after 10s
  // const timeLeft = currentTime + 10000 - currentTime; // ~10s
  const timeLeft = exp * 1000 - currentTime;

  clearTimeout(expiredTimer);

  expiredTimer = setTimeout(() => {
    // eslint-disable-next-line no-alert
    alert("Token expired");

    localStorage.removeItem("accessToken");

    window.location.href = PATH_AUTH.login;
  }, timeLeft);
};

export { isValidToken, setSpaceSession };
