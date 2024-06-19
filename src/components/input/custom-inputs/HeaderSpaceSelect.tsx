import { Box, ComboboxItem, MantineStyleProp, Select } from "@mantine/core";
import { useEffect, useState } from "react";
import { UseFormReturnType } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { get } from "http";
import axiosInstance from "../../../utils/axios-instance";
import { apiEndpointRootsEnum } from "../../../path/path-api";
import { useCookieContext } from "../../../context/CookieContext";
import { convertToSelectItems } from "../../../utils/helpers/helper-functions";
import { useCrudSelectors, useCrudSliceStore } from "../../../redux/features/crud/crudSlice";
import { SpaceModel } from "../../../types/models/space-model";
import {
  useSpaceSelectionSelectors,
  useSpaceSelectionSliceStore,
} from "../../../redux/features/crud/spaceSelectionSlice";
import useAuth from "../../../../hooks/useAuth";

interface OrganizationSpaceSelectProps {
  style?: MantineStyleProp;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  labels?: { organization: string; space: string };
  form?: UseFormReturnType<Record<string, unknown>> | null;
  // organizationsLabel?: string;
  // spacesLabel?: string;
}

const HeaderSpaceSelect = ({
  style,
  size = "xs",
  labels,
  form = null,
}: OrganizationSpaceSelectProps) => {
  // const [opened, { toggle }] = useDisclosure(false);
  const { reInitialize } = useAuth();
  const { setCurrentSpace, resetCurrentSpace, currentSpace } = useCookieContext();
  const { fetchSpaceSelections: fetchCrudDocuments } = useSpaceSelectionSliceStore();
  const { spaceSelections: spaces } = useSpaceSelectionSelectors();
  // const [spaces, setSpaces] = useState<ComboboxItem[]>([]);

  const handleDeleteSpaceCookie = async () => {
    await axiosInstance.delete(apiEndpointRootsEnum.getSpaceSelections);
    setCurrentSpace(null);
    await reInitialize();
  };

  const getSpaceCookieFromApi = async (spaceId: string) => {
    // case select is cleared
    const response = await axiosInstance.get(
      `${apiEndpointRootsEnum.getSpaceSelections}/${spaceId}`
    );
    setCurrentSpace(response.data.data.space);
    await reInitialize();
  };

  useEffect(() => {
    fetchCrudDocuments({});
  }, []);
  return (
    <Select
      name="space"
      size={size}
      clearable
      disabled={!spaces.length}
      label={labels?.space}
      data={spaces.map((space) => ({ value: space._id, label: space.name }))}
      onChange={(value) => {
        if (value === null) {
          handleDeleteSpaceCookie();
          return;
        }
        getSpaceCookieFromApi(value || "");
        if (form) {
          form.setFieldValue("space", value || "");
        }
      }}
      value={currentSpace?._id || null}
      style={style}
    />
  );
};

export default HeaderSpaceSelect;
