import React, { useEffect, useRef, useState } from "react";
import { Box } from "@mantine/core";
import Image from "next/image";
import classes from "./LogosDiffer.module.css";

const options = {
  root: null,
  rootMargin: "0px",
  threshold: 0.5,
};
const LogosDiffer = ({ title }: { title: string }) => {
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  const callbackFn = (entries: IntersectionObserverEntry[]) => {
    const [entry] = entries;
    setIsVisible(entry.isIntersecting);
    // entries.forEach((entry) => {
    //   //
    // });
  };

  useEffect(() => {
    const currentRef = containerRef.current;
    const observer = new IntersectionObserver(callbackFn, options);
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [containerRef, options]);
  return (
    <Box ref={containerRef}>
      <Box
        className={isVisible ? classes.show : classes.hide}
        style={{
          display: "grid",
          placeItems: "center",
          alignContent: "center",
          minHeight: "100vh",
        }}
      >
        <h1>{title}</h1>
        <Box className={classes.logos}>
          <Image
            // className={classes.logo}
            className={isVisible ? classes.logo : classes.logoHide}
            height={100}
            width={100}
            src="/images/flatmate_circle_logo_yellow.png"
            alt="logo"
          />
          <Image
            // className={classes.logo}
            className={isVisible ? classes.logo : classes.logoHide}
            height={100}
            width={100}
            src="/images/flatmate_circle_logo_yellow.png"
            alt="logo"
          />
          <Image
            // className={classes.logo}
            className={isVisible ? classes.logo : classes.logoHide}
            height={100}
            width={100}
            src="/images/flatmate_circle_logo_yellow.png"
            alt="logo"
          />
          <Image
            // className={classes.logo}
            className={isVisible ? classes.logo : classes.logoHide}
            height={100}
            width={100}
            src="/images/flatmate_circle_logo_yellow.png"
            alt="logo"
          />
        </Box>
      </Box>
    </Box>
  );
};

export default LogosDiffer;
