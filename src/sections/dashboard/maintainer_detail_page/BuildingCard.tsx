import { Skeleton, Text } from "@mantine/core";
import CardWithTitle from "../../../components/profile/side/CardWithTitle";
import TextWithIcon from "../../../components/text/TextWithIcon";
import { ICON_SIZES, Icons } from "../../../data/icons/icons";
import { useCrudSelectors } from "../../../redux/features/crud/crudSlice";
import { getEntityFromUrl } from "../../../utils/helpers/helper-functions";
import { SpaceModel } from "../../../types/models/space-model";
import { MaintainerModel } from "../../../types/models/maintainer-model";
import { Entity } from "../../../types/redux/CrudSliceInterfaces";

const ICON_SIZE = ICON_SIZES.textTile;

export const BuildingCard = () => {
  const _entity = getEntityFromUrl();
  const { crudDocument: document } = useCrudSelectors<MaintainerModel>(_entity as Entity);
  if (!document?.spaces) return <Skeleton />;
  return (
    <CardWithTitle title="Condominium/Office">
      {document.spaces?.length ? (
        document.spaces?.map((space: SpaceModel) => (
          <TextWithIcon
            key={space._id}
            icon={<Icons.buildings size={ICON_SIZE} />}
            text={space.name}
          />
        ))
      ) : (
        <Text>No spaces assigned</Text>
      )}
    </CardWithTitle>
  );
};
