import Head from "next/head";
import React, { ReactNode } from "react";

export const MetaPage = ({
  children,
  title,
  otherHead,
}: {
  children: ReactNode;
  title: string | undefined;
  otherHead?: ReactNode;
}) => {
  return (
    <>
      <Head>
        <title>{title || "FlatMate"}</title>
        {otherHead}
      </Head>
      {children}
    </>
  );
};
