import React from 'react';
import CardWithTitle from '../../../components/profile/side/CardWithTitle';
import TextWithIcon from '../../../components/text/TextWithIcon';
import { Icons } from '../../../data/icons';
import { useCrudSelectors } from '../../../redux/features/crud/crudSlice';
import { Skeleton, Text } from '@mantine/core';
import { get } from 'http';
import { getEntityFromUrl } from '../../../utils/helper-functions';
import { Sections } from '../../../types/general/data/sections-type';
export const BuildingCard = () => {
  const _entity = getEntityFromUrl();
  const { selectedCrudDocument: document } = useCrudSelectors(_entity as Sections);
  if (!document.spaces) return <Skeleton />;
  return (
    <CardWithTitle titleSx={{ fontSize: 24 }} title="Condominium/Office">
      {document.spaces?.length ? (
        document.spaces?.map((space: SpaceModel) => (
          <TextWithIcon key={space._id} icon={<Icons.buildings />} text={space.name} />
        ))
      ) : (
        <Text>No spaces assigned</Text>
      )}
    </CardWithTitle>
  );
};
