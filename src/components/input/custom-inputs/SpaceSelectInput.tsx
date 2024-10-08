import { Box, ComboboxItem, MantineStyleProp, Select } from "@mantine/core";
import { useEffect, useState } from "react";
import { UseFormReturnType } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import axiosInstance from "../../../utils/axios-instance";
import { apiEndpointRootsEnum } from "../../../path/path-api";
import { convertToSelectItems } from "../../../utils/helpers/helper-functions";
import { useItemSlice } from "../../../redux/features/crud/selectedItemSlice";
import { SpaceModel } from "../../../types/models/space-model";
import { useCrudSelectors, useCrudSliceStore } from "../../../redux/features/crud/crudSlice";
import { useCookieContext } from "../../../context/CookieContext";

interface SpaceSelectInputProps {
  style?: MantineStyleProp;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  labels?: { organization: string; space: string };
  form?: UseFormReturnType<Record<string, unknown>> | null;
  className?: string;
  placeholder?: string;
  onChangeCallback?: (value: string | null) => void;
  // organizationsLabel?: string;
  // spacesLabel?: string;
}

const SpaceSelectInput = ({
  style,
  size = "xs",
  labels,
  form = null,
  placeholder = "",
  className,
  onChangeCallback,
}: SpaceSelectInputProps) => {
  const [spaces, setSpaces] = useState<ComboboxItem[]>([]);
  const { setCrudDocuments, setCrudDocument } = useCrudSliceStore();
  const { crudDocuments } = useCrudSelectors<SpaceModel>("spaces");
  const { set, get } = useItemSlice<{ space: SpaceModel | null }>({
    space: null,
  });
  const handleGetSpaces = async () => {
    try {
      // if (isSuperAdmin) return;
      const response = await axiosInstance.get(`${apiEndpointRootsEnum.getSpaceSelections}`);
      const selectOptions = convertToSelectItems(response.data.data);
      setSpaces(selectOptions);
      setCrudDocuments({ entity: "spaces", documents: response.data.data });
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

  const handleChange = (value: string | null) => {
    set((prev) => ({
      ...prev,
      space: crudDocuments.find((space) => space._id === value) || null,
    }));
    onChangeCallback?.(value);
  };

  return (
    <Select
      name="space"
      size={size}
      clearable
      searchable
      disabled={!spaces.length}
      label={labels?.space}
      data={spaces}
      placeholder={placeholder}
      value={get?.space?._id || currentSpace?._id || null}
      onChange={handleChange}
      style={style}
      className={className}
    />
  );
};

export default SpaceSelectInput;
