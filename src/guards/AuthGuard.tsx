import { useEffect, useState } from 'react';
// Next js
import { useRouter } from 'next/router';

// hooks
import useAuth from '../../hooks/useAuth';
import LoginPage from '../sections/login_signup_page/LoginForm';
import { LoadingOverlay } from '@mantine/core';

export default function AuthGuard({ children }: { children: JSX.Element | JSX.Element[] }) {
  const { isAuthenticated, isInitialized } = useAuth();
  const { pathname, push } = useRouter();
  const [requestedLocation, setRequestedLocation] = useState<string | null>(null);

  useEffect(() => {
    if (requestedLocation && pathname !== requestedLocation) {
      console.log('if (requestedLocation && pathname !== requestedLocation) {');
      console.log('AuthGuard: requestedLocation', requestedLocation);
      push(requestedLocation);
    }
    if (isAuthenticated) {
      setRequestedLocation(null);
    }
  }, [isAuthenticated, pathname, push, requestedLocation]);

  if (!isInitialized) {
    console.log('AuthGuard: !isInitialized');
    return <LoadingOverlay visible />;
  }

  if (!isAuthenticated) {
    if (pathname !== requestedLocation) {
      console.log('AuthGuard: !isAuthenticated && pathname !== requestedLocation');
      setRequestedLocation(pathname);
      return <LoadingOverlay visible />;
    }
    console.log('AuthGuard: !isAuthenticated && pathname === requestedLocation');
    push('/login');
    return <LoadingOverlay visible />;
  }
  /** finally authenticated user enters here */
  console.log('AuthGuard: finally authenticated user enters here');
  return <>{children}</>;
}
