import { ReactNode, useEffect } from "react";
// next
import { useRouter } from "next/router";
// hooks
import useAuth from "../../hooks/useAuth";
// routes
import { PATH_CLIENT } from "../path/path-frontend";
import { useCookieContext } from "../context/CookieContext";

// ----------------------------------------------------------------------

export default function GuestGuard({ children }: { children: ReactNode }) {
  const { push } = useRouter();
  const { isAuthenticated } = useAuth();
  const { currentSpace } = useCookieContext();

  useEffect(() => {
    if (isAuthenticated) {
      if (currentSpace?._id) {
        push(`${PATH_CLIENT.dashboard}/${currentSpace.slug}`);
        return;
      }
      push(PATH_CLIENT.chooseRootSpace);
    }
  }, [isAuthenticated]);

  return <>{children}</>;
}
