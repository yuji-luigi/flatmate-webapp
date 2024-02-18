import { Box, Chip, Text } from '@mantine/core';
import { AccessControllerModel } from '../../../../../types/models/access-controller-type';
import { useItemSlice } from '../../../../../redux/features/crud/selectedItemSlice';
import { SpaceModel } from '../../../../../types/models/space-model';
import { useCrudSelectors } from '../../../../../redux/features/crud/crudSlice';
import classes from './AccCtrlSpaceChips.module.css';

export const AccCtrlSpaceChips: React.FC = () => {
  const { crudDocuments: spaces } = useCrudSelectors<SpaceModel>('spaces');
  const { crudDocuments: accessControllers } =
    useCrudSelectors<AccessControllerModel>('accessControllers');
  const actlSpaceId = [
    ...new Set(
      accessControllers.map((actl) =>
        typeof actl.rootSpace === 'string' ? actl.rootSpace : actl.rootSpace._id
      )
    ),
  ];

  return (
    <Box className={classes.spaceChipContainer}>
      <Text>Access to following spaces:</Text>
      <Box className={classes.chips}>
        {actlSpaceId.map((spaceId) => (
          <SpaceChip key={spaceId} spaceId={spaceId} spaces={spaces} />
        ))}
      </Box>
    </Box>
  );
};
function SpaceChip({ spaceId, spaces }: { spaceId: string; spaces: SpaceModel[] }) {
  const { get, set } = useItemSlice<{ space: string | null; spaceObject?: null | SpaceModel }>();
  const handleSelected = () => {
    set({ space: spaceId, spaceObject: spaces.find((space) => space._id === spaceId) });
  };
  const spaceName = spaces.find((space) => space._id === spaceId)?.name;
  return (
    <>
      <Chip onClick={handleSelected} checked={get?.space === spaceId} value={spaceId} fw="bold">
        {spaceName || 'Error: Space not found'}
      </Chip>
    </>
  );
}
