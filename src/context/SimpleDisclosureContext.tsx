import { current } from "@reduxjs/toolkit";
import { getCookie } from "cookies-next";
import jwtDecode from "jwt-decode";
import { useRouter } from "next/router";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import { useCrudSliceStore } from "../redux/features/crud/crudSlice";

export type SimpleDisclosureContextState = {
  opened: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
};

export const SimpleDisclosureContext = createContext<SimpleDisclosureContextState>({
  opened: false,
  open: () => {},
  close: () => {},
  toggle: () => {},
});

const useSimpleDisclosureStore = () => {
  const [opened, { close, open, toggle }] = useDisclosure();
  return {
    opened,
    close,
    open,
    toggle,
  };
};

export const SimpleDisclosureContextProvider = ({ children }: { children: ReactNode }) => (
  <SimpleDisclosureContext.Provider value={useSimpleDisclosureStore()}>
    {children}
  </SimpleDisclosureContext.Provider>
);

export const useSimpleDisclosureContext = () => useContext(SimpleDisclosureContext);
