import React from "react";
import { SimpleDisclosureContextProvider } from "../../../context/SimpleDisclosureContext";
import { HeaderCreationButton } from "./HeaderCreationButton";

export const HeaderCreationModalWrapper = () => {
  return (
    <SimpleDisclosureContextProvider>
      <HeaderCreationButton />
    </SimpleDisclosureContextProvider>
  );
};
