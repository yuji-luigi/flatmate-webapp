import { ReactNode, createContext, useContext, useState } from "react";

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
