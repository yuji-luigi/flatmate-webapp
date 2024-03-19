import { TextInput } from "@mantine/core";
import React, { ChangeEvent } from "react";
import { useFilter } from "../../../../hooks/useFilter";

export const TextFilterInput = () => {
  const { textFilter, setTextFilter } = useFilter();
  const handleTextFilter = (e: ChangeEvent<HTMLInputElement>) => {
    setTextFilter(e.target.value);
  };
  return <TextInput onChange={handleTextFilter} placeholder="Search" />;
};
