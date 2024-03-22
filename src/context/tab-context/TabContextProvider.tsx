import { getCookie } from "cookies-next";
import { useRouter } from "next/router";
import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { sections } from "../../data";
import { useCrudSliceStore } from "../../redux/features/crud/crudSlice";
import { CurrentSpace } from "../../types/context/auth/useAuth";
import { SpaceModel } from "../../types/models/space-model";
import { isString } from "../../utils/type-guard/isString";

interface TabContextState {
  currentTab: null | string;
  setCurrentTab: (tab: string | null) => void;
}

export const TabContext = createContext<TabContextState>({
  currentTab: null,
  setCurrentTab: () => {},
});

const useStore = () => {
  const [currentTab, setCurrentTab] = useState<null | string>(null);

  return {
    currentTab,
    setCurrentTab,
  };
};

export const TabContextProvider = ({ children }: { children: ReactNode }) => (
  <TabContext.Provider value={useStore()}>{children}</TabContext.Provider>
);

export const useTabContext = () => useContext(TabContext);
