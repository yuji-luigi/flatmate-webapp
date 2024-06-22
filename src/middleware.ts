import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import axiosInstance from "./utils/axios-instance";
import { apiEndpoint } from "./path/path-api";

export async function middleware(request: Request) {
  // You can get initial user data from cookies
  // const cookiesStore = cookies();
  // console.log({ cookiesStore });
  // const rawMe = await axiosInstance.get(apiEndpoint.auth.me,
  //   // set all cookies
  //   {
  //     headers: {
  //       cookie: ,
  //     },
  //   }
  // ).catch(() => null);
  // Store current request url in a custom header, which you can read later
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-forwarded-url", request.url);

  return NextResponse.next({
    request: {
      // Apply new request headers
      headers: requestHeaders,
    },
  });
}
