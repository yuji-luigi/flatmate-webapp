import { useEffect, useState } from "react";
// Next js
import { useRouter, usePathname } from "next/navigation";

// hooks
import { LoadingOverlay } from "@mantine/core";
import useAuth from "../../hooks/useAuth";
import { _PATH_FRONTEND } from "../path/path-frontend";
import { Role, ROLES } from "../types/models/space-model";

export default function AuthGuardAppRouter({
  children,
  canAccessBy = [...ROLES],
}: {
  children: JSX.Element | JSX.Element[];
  canAccessBy?: Role[];
}) {
  const { isAuthenticated, isInitialized, user } = useAuth();
  const { push } = useRouter();
  const pathname = usePathname();
  const [requestedLocation, setRequestedLocation] = useState<string | null>(null);
  useEffect(() => {
    if (requestedLocation && pathname !== requestedLocation) {
      push(requestedLocation);
    }
    if (isAuthenticated) {
      setRequestedLocation(null);
    }
  }, [isAuthenticated, pathname, push, requestedLocation]);

  if (!isInitialized) {
    return <LoadingOverlay visible />;
  }

  if (!isAuthenticated) {
    if (pathname !== requestedLocation) {
      setRequestedLocation(pathname);
      return <LoadingOverlay visible />;
    }

    push(_PATH_FRONTEND.auth.guardToLogin);
    return <LoadingOverlay visible />;
  }

  /** finally authenticated user enters here */
  // console.log('AuthGuardAppRouter: finally authenticated user enters here');

  if (user && !canAccessBy.includes(user.loggedAs)) {
    push(_PATH_FRONTEND.error.unauthorized);
  }

  return <>{children}</>;
}
