import jwtDecode from 'jwt-decode';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Sections } from '../types/general/data/sections-type';

export const CurrentEntityContext = createContext<{
  currentEntity: Sections | null;
  setCurrentEntity: (entity: Sections | null) => void;
}>({
  currentEntity: null,
  setCurrentEntity: (entity: Sections | null) => {},
});

const useStore = () => {
  const [currentEntity, setCurrentEntity] = useState<Sections | null>(null);
  const { query } = useRouter();
  const urlEntity = query.entity as Sections;
  useEffect(() => {
    if (urlEntity) {
      setCurrentEntity(urlEntity);
    }
  }, [urlEntity]);

  return {
    currentEntity,
    setCurrentEntity,
  };
};

export const CurrentEntityContextProvider = ({ children }: { children: ReactNode }) => (
  <CurrentEntityContext.Provider value={useStore()}>{children}</CurrentEntityContext.Provider>
);

export const useCurrentEntityContext = () => useContext(CurrentEntityContext);
