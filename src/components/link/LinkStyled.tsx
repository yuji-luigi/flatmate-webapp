import Link from "next/link";
import React, { ReactNode } from "react";
import classes from "./LinkStyled.module.css";
import { NextURL } from "next/dist/server/web/next-url";
import { UrlObject } from "url";
export const LinkStyled = ({
  children,
  href,
}: {
  children: ReactNode;
  href: string | UrlObject;
}) => {
  return (
    <Link className={classes.link} href={href}>
      {children}
    </Link>
  );
};
