import { useEffect } from 'react';
// next
import { useRouter } from 'next/router';
// config
import { PATH_AFTER_LOGIN, PATH_DASHBOARD } from '../../path/page-paths';
import useAuth from '../../../hooks/useAuth';
import NotFoundImage from '../404';
// routes

// ----------------------------------------------------------------------

export default function Index() {
  const { pathname, replace, prefetch } = useRouter();
  const { isAuthenticated } = useAuth();
  useEffect(() => {
    if (!isAuthenticated) replace(PATH_DASHBOARD.login);
    if (pathname === PATH_DASHBOARD.root) {
      replace(PATH_DASHBOARD.posts);
    }
  }, [pathname]);

  useEffect(() => {
    prefetch(PATH_AFTER_LOGIN);
  }, []);

  return <NotFoundImage />;
}
