import { current } from '@reduxjs/toolkit';
import { getCookie } from 'cookies-next';
import jwtDecode from 'jwt-decode';
import { useRouter } from 'next/router';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { useCrudSliceStore } from '../redux/features/crud/crudSlice';
import { sections } from '../data';
import { CurrentSpace } from '../types/context/auth/useAuth';
import { CookieContextState } from '../types/context/cookie-context';

export const CookieContext = createContext<CookieContextState>({
  currentSpace: null,
  setCurrentSpace: (space: CurrentSpace | null) => {},
  currentOrganization: null,
  setCurrentOrganization: (organization: string | null) => {},
  resetCurrentSpace: () => {},
});

const useStore = () => {
  const [currentSpace, setCurrentSpace] = useState<CurrentSpace | null>(null);
  const [currentOrganization, setCurrentOrganization] = useState<string | null>(null);
  const router: { query: ParsedQueryCustom; pathname: string } = useRouter();
  const entity = router.query.entity || router.pathname.split('/').pop();

  const { fetchCrudDocumentsWithPagination } = useCrudSliceStore();

  useEffect(() => {
    if (!currentOrganization) {
      const organizationId = getCookie('organization');
      if (typeof organizationId === 'boolean' || !organizationId) return;
      setCurrentOrganization(organizationId);
    }
  }, []);

  useEffect(() => {
    if (!currentSpace) {
      const spaceJWT = getCookie('space');
      if (typeof spaceJWT === 'boolean') return;
      try {
        const decodedSpace = spaceJWT ? jwtDecode<CurrentSpace>(spaceJWT) : null;
        setCurrentSpace(decodedSpace);
      } catch (error) {
        console.error('Error decoding JWT:', error); // Check if there's an error in jwtDecode
      }
    }
  }, []);

  // this is breaking SRP
  // when header selected space or organization changes then the documents in the current section(entity in url) will be updated
  useEffect(() => {
    if (!currentSpace?._id || !sections.includes(entity)) return;
    fetchCrudDocumentsWithPagination({ entity });
  }, [currentSpace?._id]);

  useEffect(() => {
    if (!currentOrganization || !entity) return;
    fetchCrudDocumentsWithPagination({ entity });
  }, [currentOrganization]);

  return {
    currentSpace,
    setCurrentSpace: (space: CurrentSpace | null) => {
      setCurrentSpace(space);
    },
    resetCurrentSpace: () => setCurrentSpace({ _id: 'no space', name: '', address: '', slug: '' }),
    currentOrganization,
    setCurrentOrganization,
  };
};

export const CookieContextProvider = ({ children }: { children: ReactNode }) => (
  <CookieContext.Provider value={useStore()}>{children}</CookieContext.Provider>
);

export const useCookieContext = () => useContext(CookieContext);
