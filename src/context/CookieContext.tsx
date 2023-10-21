import { getCookie } from 'cookies-next';
import { useRouter } from 'next/router';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
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
});

const useStore = () => {
  const [currentSpace, setCurrentSpace] = useState<CurrentSpace | null>(null);
  const [currentOrganization, setCurrentOrganization] = useState<string | null>(null);
  const router: { query: ParsedQueryCustom; pathname: string } = useRouter();
  const entity = router.query.entity || getEntityFromUrlForCookieCtx();

  const { fetchCrudDocumentsWithPagination } = useCrudSliceStore();

  useEffect(() => {
    if (!currentOrganization) {
      const organizationId = getCookie('organizationId');
      if (typeof organizationId === 'boolean' || !organizationId) return;
      setCurrentOrganization(organizationId);
    }
  }, []);

  useEffect(() => {
    if (!currentSpace) {
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
    }
  }, []);

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
    handleSetCurrentSpace: (space: SpaceModel | null) => {
      if (!space) return;
      setCurrentSpace({
        _id: space._id,
        name: space.name,
        slug: space.slug,
        address: space.address,
        image: space.cover?.url,
      });
    },
    resetCurrentSpace: () => {
      setCurrentSpace(null);
    },
    currentOrganization,
    setCurrentOrganization,
  };
};

export const CookieContextProvider = ({ children }: { children: ReactNode }) => (
  <CookieContext.Provider value={useStore()}>{children}</CookieContext.Provider>
);

export const useCookieContext = () => useContext(CookieContext);
