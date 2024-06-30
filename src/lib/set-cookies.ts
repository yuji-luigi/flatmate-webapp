import { cookies } from "next/headers";

export const setCookies = (cookieStore: ReturnType<typeof cookies>, rawCookies: string[]): void => {
  rawCookies.forEach((cookie) => {
    const [name, ...rest] = cookie.split("=");
    const value = rest.join("=");
    cookieStore.set(name, value, {
      httpOnly: true,
      path: "/",
    });
  });
};
