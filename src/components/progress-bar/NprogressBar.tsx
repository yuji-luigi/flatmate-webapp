import { useRouter } from "next/router";
import NProgress from "nprogress";
import React, { ReactNode, useEffect } from "react";

export const NprogressBar = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  useEffect(() => {
    router.events.on("routeChangeStart", () => NProgress.start());
    router.events.on("routeChangeComplete", () => NProgress.done());
    router.events.on("routeChangeError", () => NProgress.done());
    return () => {
      router.events.off("routeChangeStart", () => {
        // console.log('routeChangeStart');
      });
      router.events.off("routeChangeComplete", () => {
        // console.log('routeChangeComplete');
      });
      router.events.off("routeChangeError", () => {
        // console.log('routeChangeError');
      });
    };
  }, [router]);
  return children;
};
