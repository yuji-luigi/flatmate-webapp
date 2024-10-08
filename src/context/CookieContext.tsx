import { getCookie } from "cookies-next";
import { createContext, ReactNode, useContext, useEffect, useRef, useState } from "react";
import { CurrentSpace } from "../types/context/auth/useAuth";
import { CookieContextState } from "../types/context/cookie-context";
import { isString } from "../utils/type-guard/isString";
import useAuth from "../../hooks/useAuth";

export const CookieContext = createContext<CookieContextState>({
  currentSpace: null,
  setCurrentSpace: () => {},
  currentOrganization: null,
  setCurrentOrganization: () => {},
  resetCurrentSpace: () => {},
  handleSetCurrentSpace: () => {},
  hasSelectChanged: false,
});

const useStore = () => {
  const [currentSpace, setCurrentSpace] = useState<CurrentSpace | null>(null);
  const [currentOrganization, setCurrentOrganization] = useState<string | null>(null);
  const prevSpaceRef = useRef(currentSpace);
  const prevOrgRef = useRef(currentOrganization);
  const { user } = useAuth();

  const hasSpaceChanged = prevSpaceRef.current !== currentSpace;
  const hasOrgChanged = prevOrgRef.current !== currentOrganization;
  const hasSelectChanged = hasSpaceChanged || hasOrgChanged;

  useEffect(() => {
    if (!currentOrganization) {
      const organizationId = getCookie("organizationId");
      if (typeof organizationId === "boolean" || !organizationId) return;
      setCurrentOrganization(organizationId);
    }
  }, []);

  useEffect(() => {
    if (!currentSpace) initializeCurrentSpaceFromCookie();
  }, [user]);

  const initializeCurrentSpaceFromCookie = () => {
    const spaceId = getCookie("spaceId");
    const spaceName = localStorage.getItem("spaceName");
    const spaceAddress = localStorage.getItem("spaceAddress");
    const spaceSlug = localStorage.getItem("spaceSlug");
    const spaceImage = localStorage.getItem("spaceImage");
    console.log({
      spaceId,
      spaceName,
      spaceAddress,
      spaceSlug,
    });
    if (isString(spaceId) && isString(spaceName) && isString(spaceSlug)) {
      setCurrentSpace({
        _id: spaceId,
        name: spaceName,
        slug: spaceSlug,
        image: spaceImage || "",
        address: spaceAddress || "",
      });
    }
  };

  const handleSetCurrentSpace = (space: CurrentSpace | null) => {
    localStorage.setItem("spaceSlug", space?.slug || "");
    localStorage.setItem("spaceName", space?.name || "");
    localStorage.setItem("spaceImage", space?.image || "");
    localStorage.setItem("spaceAddress", space?.address || "");
    setCurrentSpace(space);
  };
  return {
    currentSpace,
    setCurrentSpace: handleSetCurrentSpace,
    handleSetCurrentSpace: initializeCurrentSpaceFromCookie,
    resetCurrentSpace: () => {
      setCurrentSpace(null);
    },
    currentOrganization,
    setCurrentOrganization,
    hasSelectChanged,
  };
};

export const CookieContextProvider = ({ children }: { children: ReactNode }) => (
  <CookieContext.Provider value={useStore()}>{children}</CookieContext.Provider>
);

export const useCookieContext = (/* args?: UseCookieCtxParams */) => {
  const context = useContext(CookieContext);
  if (!context) throw new Error("cookie context must be used within a CookieContextProvider");
  return context;
};
