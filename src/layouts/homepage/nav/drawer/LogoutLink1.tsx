import Link from "next/link";
import { useRouter } from "next/router";
import { PATH_CLIENT } from "../../../../path/path-frontend";
import classes from "./HomepageDrawer.module.css";
import { Icons } from "../../../../data/icons/icons";

/**
 *
 * @description regular login button. color dark
 */
export const LogoutLink = () => {
  const { pathname } = useRouter();
  if (pathname === PATH_CLIENT.login) {
    return null;
  }
  return (
    <Link className={classes.link} href={PATH_CLIENT.logout}>
      <Icons.logout className={classes.logIcon} />
      Logout
    </Link>
  );
};
