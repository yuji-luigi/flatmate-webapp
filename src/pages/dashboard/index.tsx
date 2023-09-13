import { useEffect } from 'react';
// next
import { useRouter } from 'next/router';
// config
import { PATH_AFTER_LOGIN, PATH_CLIENT } from '../../path/path-frontend';
import useAuth from '../../../hooks/useAuth';
import NotFoundImage from '../404';
// routes

// ----------------------------------------------------------------------

export default function Index() {
  const { pathname, replace, prefetch } = useRouter();
  const { isAuthenticated } = useAuth();
  useEffect(() => {
    if (!isAuthenticated) replace(PATH_CLIENT.login);
    if (pathname === PATH_CLIENT.root) {
      replace(PATH_CLIENT.posts);
    }
  }, [pathname]);

  useEffect(() => {
    prefetch(PATH_AFTER_LOGIN);
  }, []);

  return <NotFoundImage />;
}
