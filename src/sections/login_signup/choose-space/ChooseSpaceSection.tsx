import { Box, Button, Text } from "@mantine/core";
import Link from "next/link";
import {
  CardArticleVerticalTextBottom,
  CardData,
} from "../../../components/card/CardVerticalTextBottom";
import { PATH_CLIENT, _PATH_FRONTEND } from "../../../path/path-frontend";
import classes2 from "../../../styles/global-useStyles.module.css";
import { SpaceModel } from "../../../types/models/space-model";
import axiosInstance, { AxiosResDataGeneric } from "../../../utils/axios-instance";
import { PATH_API } from "../../../path/path-api";
import useAuth from "../../../../hooks/useAuth";
import classes from "./ChooseSpaceSection.module.css";
import { useCookieContext } from "../../../context/CookieContext";
import { CurrentSpace } from "../../../types/context/auth/useAuth";
import useRouterWithCustomQuery from "../../../hooks/useRouterWithCustomQuery";

export const ChooseSpaceSection = ({ spaces }: { spaces: SpaceModel[] }) => {
  const { user } = useAuth();
  const { setCurrentSpace } = useCookieContext();
  const router = useRouterWithCustomQuery();

  const handleSpaceSelected = async (spaceId: string) => {
    const rawSpace = await axiosInstance.get<AxiosResDataGeneric<{ space: CurrentSpace }>>(
      `${PATH_API.getSpaceSelections}/${spaceId}`
    );
    setCurrentSpace(rawSpace.data.data.space);
    router.push(_PATH_FRONTEND.dashboard.root);
  };

  if (!user) return null;
  return (
    <Box className={classes2.container}>
      {user.isSuperAdmin && (
        <Box>
          <Button component={Link} href={PATH_CLIENT.chooseOrganization} variant="outline">
            Back
          </Button>
        </Box>
      )}
      <Text variant="text" fz={36} fw={600} ta="center">
        Choose a space
      </Text>
      <Box
        className={classes.pinContainer}
        py="xl" /* cols={2} breakpoints={[{ max-width: 'sm', cols: 1 }]} */
      >
        {spaces.map((space) => (
          <CardArticleVerticalTextBottom
            key={space._id}
            data={space as CardData}
            onClick={() => handleSpaceSelected(space._id)}
          />
        ))}
      </Box>
    </Box>
  );
};
