import { useContext } from "react";
import { SimpleDisclosureContext } from "../src/context/SimpleDisclosureContext";

export const useSimpleDisclosureCtx = () => {
  const context = useContext(SimpleDisclosureContext);
  if (!context) throw new Error("Auth context must be used inside AuthProvider");
  return context;
};
