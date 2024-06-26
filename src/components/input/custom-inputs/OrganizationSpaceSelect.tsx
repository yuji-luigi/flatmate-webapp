import { Box, ComboboxItem, MantineStyleProp, Select } from "@mantine/core";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { UseFormReturnType } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import axiosInstance from "../../../utils/axios-instance";
import { apiEndpointRootsEnum, apiEndpoint } from "../../../path/path-api";
import { useCookieContext } from "../../../context/CookieContext";
import { convertToSelectItems } from "../../../utils/helpers/helper-functions";
import useAuth from "../../../../hooks/useAuth";

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

  const [organizations, setOrganizations] = useState<ComboboxItem[]>([]);
  const {
    setCurrentOrganization,
    setCurrentSpace,
    currentSpace,
    currentOrganization,
    resetCurrentSpace,
  } = useCookieContext();

  const [spaces, setSpaces] = useState<ComboboxItem[]>([]);
  const router = useRouter();
  const { user } = useAuth();
  const isSuperAdmin = true;

  const deleteHeaderCookies = async () => {
    await axiosInstance.delete(`${apiEndpointRootsEnum.organizationCookie}`);
    await axiosInstance.delete(apiEndpointRootsEnum.getSpaceSelections);
    setCurrentOrganization(null);
    setCurrentSpace(null);
    setSpaces([]);
  };

  const handleDeleteSpaceCookie = async () => {
    await axiosInstance.delete(apiEndpointRootsEnum.getSpaceSelections);
    setCurrentSpace(null);
  };

  const getOrganizations = async () => {
    try {
      const response = await axiosInstance.get(apiEndpoint.organizations.selections);
      const selectOptions = convertToSelectItems(response.data.data);
      setOrganizations(selectOptions);
    } catch (error) {
      showNotification({
        title: "Error",
        message: "Something went wrong while fetching organizations' data",
        color: "red",
      });
    }
  };

  /** get spaces options and reset the cookie of space. show all the info of organization without querying by space. */
  const handleOnSelectOrganization = async (organizationId: string) => {
    try {
      const response = await axiosInstance.get(
        `${apiEndpointRootsEnum.organizationCookie}/${organizationId}`
      );
      const selectOptions = convertToSelectItems(response.data.data);
      await axiosInstance.delete(`${apiEndpointRootsEnum.getSpaceSelections}`);
      setCurrentSpace(null);
      setSpaces(selectOptions);
      setCurrentOrganization(organizationId);
    } catch (error: any) {
      console.error(error.message || error);
    }
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
      // if (isSuperAdmin) return;
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

  // useEffect(() => {
  //   if (currentSpace?._id) {
  //     !spaces.length && setSpaces([{ value: currentSpace?._id, label: currentSpace?.name }]);
  //   }
  // }, [currentSpace?._id, currentOrganization]);

  useEffect(() => {
    getOrganizations();
    handleGetSpaces();
  }, []);

  return (
    <Box className={className}>
      {isSuperAdmin && (
        <Select
          name="organization"
          size={size}
          label={labels?.organization}
          clearable
          onClick={getOrganizations}
          value={currentOrganization || ""}
          // defaultValue={getCookie('organization')?.toString()}
          data={organizations}
          onChange={(value) => {
            if (value === null) {
              deleteHeaderCookies();
              return;
            }
            handleOnSelectOrganization(value || "");
            if (form) {
              form.setFieldValue("organization", value || "");
            }
          }}
          style={style}
        />
      )}
      <Select
        name="space"
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
