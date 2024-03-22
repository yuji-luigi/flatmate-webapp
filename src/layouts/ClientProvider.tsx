import React, { ReactNode } from "react";
import LoadingScreen from "../components/screen/LoadingScreen";

export const ClientProvider = ({ children }: { children: ReactNode }) => {
  const [isClient, setIsClient] = React.useState(false);
  React.useEffect(() => {
    setIsClient(true);
  }, []);
  if (!isClient) return <LoadingScreen />;
  return <>{children}</>;
};
