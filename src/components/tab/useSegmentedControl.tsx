import { type } from "os";
import { createContext, ReactNode, useContext, useState } from "react";

type SegmentedControlContext = {
  currentValue: string;
  setCurrentValue: (value: string) => void;
};

export const SegmentedControlContext = createContext<SegmentedControlContext>({
  currentValue: "",
  setCurrentValue() {},
});

const useStore = () => {
  const [currentValue, setCurrentValue] = useState("");

  return {
    currentValue,
    setCurrentValue,
  };
};

export const SegmentedControlContextProvider = ({ children }: { children: ReactNode }) => (
  <SegmentedControlContext.Provider value={useStore()}>{children}</SegmentedControlContext.Provider>
);

export const useSegmentedControl = () => useContext(SegmentedControlContext);
