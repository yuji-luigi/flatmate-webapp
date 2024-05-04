import jwtDecode from "jwt-decode";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { FrontendEntity } from "../types/redux/CrudSliceInterfaces";

export const CurrentEntityContext = createContext<{
  currentEntity: FrontendEntity | null;
  setCurrentEntity: (entity: FrontendEntity | null) => void;
}>({
  currentEntity: null,
  setCurrentEntity: (entity: FrontendEntity | null) => {},
});

const useStore = () => {
  const [currentEntity, setCurrentEntity] = useState<FrontendEntity | null>(null);

  return {
    currentEntity,
    setCurrentEntity,
  };
};

export const CurrentEntityContextProvider = ({ children }: { children: ReactNode }) => (
  <CurrentEntityContext.Provider value={useStore()}>{children}</CurrentEntityContext.Provider>
);

export const useCurrentEntityContext = (initialEntity?: FrontendEntity) => {
  const { currentEntity, setCurrentEntity } = useContext(CurrentEntityContext);
  const { query } = useRouter();
  const urlEntity = query.entity as FrontendEntity;
  useEffect(() => {
    if (urlEntity) {
      setCurrentEntity(urlEntity);
    }
    if (initialEntity) {
      setCurrentEntity(initialEntity);
    }
  }, [urlEntity, initialEntity]);
  return { currentEntity, setCurrentEntity };
};
