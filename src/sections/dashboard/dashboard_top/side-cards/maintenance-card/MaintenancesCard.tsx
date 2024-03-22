import React, { Fragment } from "react";
import { Stack, Text } from "@mantine/core";
import Link from "next/link";
import CardWithTitle from "../../../../../components/profile/side/CardWithTitle";
import classes from "../../../../../styles/global-useStyles.module.css";
import { useCrudSelectors } from "../../../../../redux/features/crud/crudSlice";
import { PATH_CLIENT } from "../../../../../path/path-frontend";
import { MaintenanceModel } from "../../../../../types/models/maintenance-model";
import { intlDateFormat } from "../../../../../utils/helpers/date-formatters";
import { TEXT_SIZE } from "../../../../../components/text/text-size";
import { SimpleLinkTile } from "../../../../../components/list/SimpleLinkTile";

const LIST_LIMIT = 5;

export const MaintenanceListCard = () => {
  const { crudDocuments: maintenances } = useCrudSelectors<MaintenanceModel>("maintenances");

  const count = maintenances.length;
  const showMore = count > LIST_LIMIT;
  const _maintenances = maintenances.slice(0, LIST_LIMIT);

  const totalMaintenances = showMore ? `5/${count}` : `${count}/${count}`;
  return (
    <CardWithTitle title={`Maintenances ${totalMaintenances}`}>
      {_maintenances.map((maintenance) => (
        <SimpleLinkTile
          _id={maintenance._id}
          key={maintenance._id}
          title={maintenance.title}
          href={`${PATH_CLIENT.maintenances}/${maintenance._id}`}
        />
      ))}
      {showMore && (
        <Link className={classes.navList} href="/dashboard/maintenances">
          <Text style={{ width: "100%", textAlign: "right" }} size="lg">
            ...See more
          </Text>
        </Link>
      )}
    </CardWithTitle>
  );
};
