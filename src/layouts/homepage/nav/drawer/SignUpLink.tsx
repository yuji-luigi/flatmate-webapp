import Link from 'next/link';
import { useRouter } from 'next/router';
import { PATH_CLIENT } from '../../../../path/path-frontend';
import classes from './HomepageDrawer.module.css';
import { Icons } from '../../../../data/icons/icons';

const isChoosePage = (path: string) =>
  path === PATH_CLIENT.chooseRootSpace || path === PATH_CLIENT.chooseOrganization;

/**
 *
 * @description regular login button. color dark
 */
export const SignUpLink = () => {
  const { pathname } = useRouter();

  if (pathname === PATH_CLIENT.signup) {
    return null;
  }
  return (
    <Link className={classes.link} href={PATH_CLIENT.signup}>
      <Icons.signup className={classes.logIcon} />
      Sign up
    </Link>
  );
};
