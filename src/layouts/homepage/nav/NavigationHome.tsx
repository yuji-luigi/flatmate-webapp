import React from "react";
import { Button } from "@mantine/core";
import Link from "next/link";
import useAuth from "../../../../hooks/useAuth";
import { ColorSchemeToggle } from "../../../components/color-schemeToggle/ColorSchemeToggle";
import { PATH_CLIENT } from "../../../path/path-frontend";
import { EnterButton } from "./header/EnterButton";
import { LoginButton } from "./header/LoginButton";
import { SignUpButton } from "./header/SignUpButton";
import { LoginLink } from "./drawer/LoginLink";
import { SignUpLink } from "./drawer/SignUpLink";

export const NavigationHome = ({ place }: { place: "header" | "drawer" }) => {
  const { user } = useAuth();
  const isHeader = place === "header";
  const isDrawer = place === "drawer";
  const nav = isHeader ? (
    <>
      <LoginButton />
      <SignUpButton />
      <ColorSchemeToggle variant="outline" />
    </>
  ) : (
    <>
      <LoginLink />
      <SignUpLink />
      <ColorSchemeToggle variant="outline" />
    </>
  );
  return nav;
  return user ? (
    <>
      <Button variant="default" component={Link} href={PATH_CLIENT.logout}>
        Logout
      </Button>
      <EnterButton />
      <ColorSchemeToggle variant="outline" />
    </>
  ) : (
    <>
      <LoginButton />
      <SignUpButton />
      <ColorSchemeToggle variant="outline" />
    </>
  );
};
