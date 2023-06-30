import { Button, Skeleton } from '@mantine/core';
import React from 'react';
import { useCrudSelectors } from '../../../redux/features/crud/crudSlice';
import { useCookieContext } from '../../../context/CookieContext';
import { getEntityFromUrl } from '../../../utils/helper-functions';

export const AddRemoveButton = ({ onClick }: { onClick: () => void }) => {
  const _entity = getEntityFromUrl();
  const { selectedCrudDocument: document } = useCrudSelectors(_entity);
  const { currentSpace } = useCookieContext();
  if (!document.spaces) return <Skeleton />;
  return (
    <>
      {!document.spaces?.includes(currentSpace?._id) ? (
        <Button onClick={onClick} variant="outline" color="red">
          Remove Maintainer From Building
        </Button>
      ) : (
        <Button onClick={onClick} variant="outline" color="yellow">
          Add Maintainer to Building
        </Button>
      )}
    </>
  );
};
