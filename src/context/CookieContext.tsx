import { getCookie } from 'cookies-next';
import { useRouter } from 'next/router';
import { createContext, ReactNode, use, useContext, useEffect, useRef, useState } from 'react';
import { useCrudSliceStore } from '../redux/features/crud/crudSlice';
import { entities, sections } from '../data';
import { CurrentSpace } from '../types/context/auth/useAuth';
import { CookieContextState } from '../types/context/cookie-context';
import { SpaceModel } from '../types/models/space-model';
import { ParsedQueryCustom } from '../types/nextjs-custom-types/useRouter-types';
import { isString } from '../utils/type-guard/isString';
import { getEntityFromUrl, getEntityFromUrlForCookieCtx } from '../utils/helpers/helper-functions';

// const exEntities = ['top/threads', 'top/maintenances', 'top/checks'];
// const ENTITIES = [...entities, ...exEntities];
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
  const router: { query: ParsedQueryCustom; pathname: string } = useRouter();
  const entity = router.query.entity || getEntityFromUrlForCookieCtx();
  const prevSpaceRef = useRef(currentSpace);
  const prevOrgRef = useRef(currentOrganization);

  const hasSpaceChanged = prevSpaceRef.current !== currentSpace;
  const hasOrgChanged = prevOrgRef.current !== currentOrganization;
  const hasSelectChanged = hasSpaceChanged || hasOrgChanged;

  const { fetchCrudDocumentsWithPagination } = useCrudSliceStore();

  useEffect(() => {
    if (!currentOrganization) {
      const organizationId = getCookie('organizationId');
      if (typeof organizationId === 'boolean' || !organizationId) return;
      setCurrentOrganization(organizationId);
    }
  }, []);
  useEffect(() => {
    if (!currentSpace) handleSetSpace();
  }, []);
  const handleSetSpace = () => {
    const spaceName = getCookie('spaceName');
    const spaceAddress = getCookie('spaceAddress');
    const spaceId = getCookie('spaceId');
    const spaceSlug = getCookie('spaceSlug');
    const spaceImage = getCookie('spaceImage');
    if (isString(spaceId) && isString(spaceName) && isString(spaceSlug)) {
      setCurrentSpace({
        _id: spaceId,
        name: spaceName,
        slug: spaceSlug,
        image: spaceImage,
        address: spaceAddress,
      });
    }
  };
  // this is breaking SRP
  // when header selected space or organization changes then the documents in the current section(entity in url) will be updated
  useEffect(() => {
    if (/* !currentSpace?._id ||  */ !entity || !entities.includes(entity)) return;
    fetchCrudDocumentsWithPagination({ entity });
  }, [currentSpace?._id]);

  useEffect(() => {
    if (!currentOrganization || !entity || !entities.includes(entity)) return;
    fetchCrudDocumentsWithPagination({ entity });
  }, [currentOrganization]);
  return {
    currentSpace,
    setCurrentSpace: (space: CurrentSpace | null) => {
      setCurrentSpace(space);
    },

    handleSetCurrentSpace: handleSetSpace,

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

type UseCookieCtxParams = {
  reFetchCrudDocuments?: boolean;
  url?: string;
};
export const useCookieContext = (/* args?: UseCookieCtxParams */) => {
  // const { reFetchCrudDocuments, customRevalidate } = args;
  // const cookieContext = useContext(CookieContext);
  // const
  // const {currentSpace,currentOrganization, hasSelectChanged} = cookieContext;
  // useEffect(() => {
  //   if(reFetchCrudDocuments){
  //     fetch
  //   }
  // },[currentSpace,currentOrganization, ])
  return useContext(CookieContext);
};
