import { Box, ComboboxItem, MantineStyleProp, Select } from "@mantine/core";
import { useEffect, useState } from "react";
import { UseFormReturnType } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import axiosInstance from "../../../utils/axios-instance";
import { apiEndpointRootsEnum } from "../../../path/path-api";
import { useCookieContext } from "../../../context/CookieContext";
import { convertToSelectItems } from "../../../utils/helpers/helper-functions";

interface OrganizationSpaceSelectProps {
  style?: MantineStyleProp;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  labels?: { organization: string; space: string };
  form?: UseFormReturnType<Record<string, unknown>> | null;
  className?: string;
  // organizationsLabel?: string;
  // spacesLabel?: string;
}

const OrganizationSpaceSelect = ({
  style,
  size = "xs",
  labels,
  form = null,
  className,
}: OrganizationSpaceSelectProps) => {
  // const [opened, { toggle }] = useDisclosure(false);

  const {
    setCurrentOrganization,
    setCurrentSpace,
    currentSpace,
    currentOrganization,
    resetCurrentSpace,
  } = useCookieContext();

  const [spaces, setSpaces] = useState<ComboboxItem[]>([]);

  const deleteHeaderCookies = async () => {
    await axiosInstance.delete(apiEndpointRootsEnum.getSpaceSelections);
    setCurrentOrganization(null);
    setCurrentSpace(null);
    setSpaces([]);
  };

  const handleDeleteSpaceCookie = async () => {
    await axiosInstance.delete(apiEndpointRootsEnum.getSpaceSelections);
    setCurrentSpace(null);
  };

  const getSpaceCookieFromApi = async (spaceId: string) => {
    if (spaceId === "") {
      await axiosInstance.delete(apiEndpointRootsEnum.getSpaceSelections);
      resetCurrentSpace();
      return;
    }
    const response = await axiosInstance.get(
      `${apiEndpointRootsEnum.getSpaceSelections}/${spaceId}`
    );
    setCurrentSpace(response.data.data.space);
  };

  const handleGetSpaces = async () => {
    try {
      const response = await axiosInstance.get(`${apiEndpointRootsEnum.getSpaceSelections}`);
      const selectOptions = convertToSelectItems(response.data.data);
      setSpaces(selectOptions);
    } catch (error) {
      showNotification({
        title: "Error",
        message: "Something went wrong while fetching spaces' data",
        color: "red",
      });
    }
  };

  useEffect(() => {
    handleGetSpaces();
  }, []);

  return (
    <Box className={className}>
      <Select
        name="accessController"
        size={size}
        clearable
        disabled={!spaces.length}
        label={labels?.space}
        onClick={handleGetSpaces}
        key={currentOrganization || ""}
        data={spaces}
        value={currentSpace?._id?.toString() || ""}
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
        style={style}
      />
    </Box>
  );
};

export default OrganizationSpaceSelect;
