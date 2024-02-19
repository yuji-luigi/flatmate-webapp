import React, { useEffect } from 'react';
import { entities } from '../data';
import { useCrudSliceStore } from '../redux/features/crud/crudSlice';
import { Sections } from '../types/general/data/sections-type';
import { useCookieContext } from '../context/CookieContext';

export const useGetCrudDocuments = ({
  entity,
  withPagination = true,
}: {
  entity: Sections;
  withPagination: boolean;
}) => {
  const { fetchCrudDocumentsWithPagination } = useCrudSliceStore();
  const { currentSpace, currentOrganization } = useCookieContext();

  useEffect(() => {
    fetchCrudDocumentsWithPagination({ entity });
  }, [currentSpace?._id]);

  useEffect(() => {
    if (!entity || !entities.includes(entity)) return;
    fetchCrudDocumentsWithPagination({ entity });
  }, [currentOrganization]);
};
