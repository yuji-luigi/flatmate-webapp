import { Button } from "@mantine/core";
import Link from "next/link";
import { useRouter } from "next/router";
import { PATH_CLIENT } from "../../../../path/path-frontend";

const isChoosePage = (path: string) =>
  path === PATH_CLIENT.chooseRootSpace || path === PATH_CLIENT.chooseOrganization;

/**
 *
 * @description regular login button. color dark
 */
export const SignUpButton = () => {
  const { pathname } = useRouter();

  if (pathname === PATH_CLIENT.signup) {
    return null;
  }
  return (
    <Button component={Link} href={PATH_CLIENT.signup}>
      Sign up
    </Button>
  );
};
