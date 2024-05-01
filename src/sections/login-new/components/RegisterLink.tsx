import { Text } from "@mantine/core";
import Link from "next/link";
import React from "react";
import { useLocale } from "../../../../hooks/useLocale";
import useRouterWithCustomQuery from "../../../hooks/useRouterWithCustomQuery";
import { AUTH } from "../../../path/path-frontend";

export const RegisterLink = () => {
  const { t } = useLocale();
  const { query } = useRouterWithCustomQuery();
  const href =
    query.redirect !== "no" && query.redirect
      ? {
          pathname: AUTH.SIGNUP_INVITATION,
          query: { redirect: query.redirect || "no" },
        }
      : AUTH.SIGNUP;
  return (
    <Text ta="center">
      Don&apos;t have an account?{" "}
      <Link
        style={{
          color: "var(--mantine-color-primary)",
          fontWeight: "bold",
        }}
        href={href}
      >
        {t("Register")}
      </Link>
    </Text>
  );
};
