import { Box, Chip, Text } from "@mantine/core";
import { useItemSlice } from "../../../../../../redux/features/crud/selectedItemSlice";
import { AccessPermissionModel, SpaceModel } from "../../../../../../types/models/space-model";
import { useCrudSelectors } from "../../../../../../redux/features/crud/crudSlice";
import classes from "./AccCtrlSpaceChips.module.css";

export const AccCtrlSpaceChips: React.FC = () => {
  const { crudDocuments: spaces } = useCrudSelectors<SpaceModel>("spaces");
  const { crudDocuments: accessPermissions } =
    useCrudSelectors<AccessPermissionModel>("accessPermissions");
  const actlSpaceId = [
    ...new Set(
      accessPermissions.map((actl) =>
        typeof actl.space === "string" ? actl.space : actl.space._id
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
  const { get, set } = useItemSlice<{ space?: null | SpaceModel }>();
  const handleSelected = () => {
    set({ space: spaces.find((space) => space._id === spaceId) });
  };
  const spaceName = spaces.find((space) => space._id === spaceId)?.name;
  return (
    <>
      <Chip
        onClick={handleSelected}
        checked={get?.space?._id === spaceId}
        value={spaceId}
        fw="bold"
      >
        {spaceName || "Error: Space not found"}
      </Chip>
    </>
  );
}
