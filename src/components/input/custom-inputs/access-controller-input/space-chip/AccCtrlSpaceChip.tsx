import { Chip } from '@mantine/core';
import { AccessControllerModel } from '../../../../../types/models/access-controller-type';
import { useItemSlice } from '../../../../../redux/features/crud/selectedItemSlice';
import { SpaceModel } from '../../../../../types/models/space-model';
import { useCrudSelectors } from '../../../../../redux/features/crud/crudSlice';

type AccCtrlSpaceChipProps = {
  accCtrl: AccessControllerModel;
};

export const AccCtrlSpaceChip: React.FC<AccCtrlSpaceChipProps> = (props: AccCtrlSpaceChipProps) => {
  const { accCtrl } = props;
  const { crudDocuments: spaces } = useCrudSelectors<SpaceModel>('spaces');
  const { get, set } = useItemSlice<{ space: string | null; spaceObject?: null | SpaceModel }>();
  const spaceId = typeof accCtrl.rootSpace === 'string' ? accCtrl.rootSpace : accCtrl.rootSpace._id;
  const handleSelected = () => {
    set({ space: spaceId, spaceObject: spaces.find((space) => space._id === spaceId) });
  };
  const spaceName = spaces.find((space) => space._id === spaceId)?.name;
  return (
    <>
      <Chip
        onClick={handleSelected}
        checked={get?.space === spaceId}
        value={spaceId}
        key={accCtrl._id}
        fw="bold"
      >
        {spaceName || 'Error: Space not found'}
      </Chip>
    </>
  );
};
