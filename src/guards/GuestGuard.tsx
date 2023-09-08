import { ReactNode, useEffect } from 'react';
// next
import { useRouter } from 'next/router';
// hooks
import useAuth from '../../hooks/useAuth';
// routes
import { PATH_CLIENT } from '../path/page-paths';
import { useCookieContext } from '../context/CookieContext';

// ----------------------------------------------------------------------

export default function GuestGuard({ children }: { children: ReactNode }) {
  const { push } = useRouter();
  console.log('GuestGuard');
  const { isAuthenticated } = useAuth();
  const { currentSpace } = useCookieContext();

  useEffect(() => {
    if (isAuthenticated) {
      if (currentSpace?._id) {
        push(PATH_CLIENT.dashboard + '/' + currentSpace.slug);
        return;
      }
      // push(PATH_CLIENT.root);
      console.log('isAuthenticated', isAuthenticated);
      console.log('isAuthenticated useeffect: push to choose root space');
      push(PATH_CLIENT.chooseRootSpace);
    }
  }, [isAuthenticated]);

  console.log('children in GuestGuard');
  return <>{children}</>;
}
