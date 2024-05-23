import React, { ReactNode, useEffect, useRef } from "react";
import { Box, Tabs } from "@mantine/core";
import { useRouter } from "next/router";
import useLayoutContext from "../../../hooks/useLayoutContext";
import { useCookieContext } from "../../context/CookieContext";
import { useTabContext } from "../../context/tab-context/TabContextProvider";
import { dashboardTabsByUserType } from "../dashboard/sections-in-tabs/tabList";
import classes from "./AuthTokenRouteLayout.module.css";
import { AuthTokenLayoutHeader } from "./AuthTokenLayoutHeader";

export const AuthTokenRouteLayout = ({
  children,
  title,
}: {
  children: ReactNode;
  title?: ReactNode;
}) => {
  const { currentSpace } = useCookieContext();
  const containerRef = useRef<HTMLDivElement>(null);
  // const bgColor = theme.colorScheme === 'dark' ? 'rgba(0,0,0,0.85)' : 'rgba(255,255,255,0.85)';
  const router = useRouter();
  const section = router.pathname.split("/").pop();
  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const { scrollY } = window;
        const speed = 0.3; // Adjust this value to change the speed. Values between 0.1 to 1 work best.
        const offset = scrollY * speed;
        containerRef.current.style.backgroundPosition = `center ${-offset}px`;
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <>
      <AuthTokenLayoutHeader title={title} />
      <Box
        ref={containerRef}
        // className={`${classes.pageContent} ${classes.bg}`}
        style={{
          paddingTop: 55,
          backgroundImage: `url(${currentSpace?.image})`,
        }}
      >
        {children}
      </Box>
    </>
  );
};
