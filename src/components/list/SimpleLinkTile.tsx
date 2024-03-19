import { Group, Stack, Text, Tooltip } from "@mantine/core";
import Link from "next/link";
import React from "react";
import { TEXT_SIZE } from "../text/text-size";
import { PATH_CLIENT } from "../../path/path-frontend";
import { intlDateFormat } from "../../utils/helpers/date-formatters";
import { MaintenanceModel } from "../../types/models/maintenance-model";
import classes from "../../styles/global-useStyles.module.css";
import { ListText } from "./ListText";

interface SimpleLinkTileProps {
  _id: string;
  title?: string;
  createdAt?: Date | string;
  href: string;
}
const TEXT_LENGTH = 20;
export const SimpleLinkTile = (props: SimpleLinkTileProps) => {
  const { title = "", href, createdAt, _id } = props;
  let _title = title.substring(0, TEXT_LENGTH);
  _title = title.length > TEXT_LENGTH ? `${_title}...` : _title;
  return (
    <Tooltip label={title}>
      <Link className={classes.navList} href={href || "/#"} key={_id} style={{ padding: 0 }}>
        <Group justify="apart" style={{ width: "100%" }}>
          <ListText title={_title} />
          <Text fw={800} fz={TEXT_SIZE.cardTile}>
            {createdAt && intlDateFormat(createdAt)}
          </Text>
        </Group>
      </Link>
    </Tooltip>
  );
};
