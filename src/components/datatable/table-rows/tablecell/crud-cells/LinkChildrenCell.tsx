import { Group, Text } from "@mantine/core";
import Link from "next/link";
import React from "react";
import { LinkChildrenFormFieldType } from "../../../../../types/general/data/data-table/form-field-type/formField-types";

const LinkChildrenCell = ({
  cellConfig,
  rowData,
  cellValue,
}: {
  cellConfig: LinkChildrenFormFieldType;
  rowData: any;
  cellValue: string;
}) => {
  const href = `${cellConfig.linkRoot || ""}/${rowData[cellConfig.linkKey] || ""}`;
  return (
    <Group gap="sm">
      <Link href={href}>
        <Text size="sm" fw={500}>
          {cellValue}
        </Text>
      </Link>
    </Group>
  );
};

export default LinkChildrenCell;
