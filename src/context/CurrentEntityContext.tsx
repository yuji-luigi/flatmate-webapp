import jwtDecode from "jwt-decode";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Entity } from "../types/redux/CrudSliceInterfaces";

export const CurrentEntityContext = createContext<{
  currentEntity: Entity | null;
  setCurrentEntity: (entity: Entity | null) => void;
}>({
  currentEntity: null,
  setCurrentEntity: (entity: Entity | null) => {},
});

const useStore = () => {
  const [currentEntity, setCurrentEntity] = useState<Entity | null>(null);

  return {
    currentEntity,
    setCurrentEntity,
  };
};

export const CurrentEntityContextProvider = ({ children }: { children: ReactNode }) => (
  <CurrentEntityContext.Provider value={useStore()}>{children}</CurrentEntityContext.Provider>
);

export const useCurrentEntityContext = (initialEntity?: Entity) => {
  const { currentEntity, setCurrentEntity } = useContext(CurrentEntityContext);
  const { query } = useRouter();
  const urlEntity = query.entity as Entity;
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
