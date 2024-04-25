import { Avatar, Box, Group, Stack, Text } from "@mantine/core";
import Link from "next/link";
import { UserNameEmailCellType } from "../../../../../types/general/data/data-table/form-field-type/formField-types";
import classes from "./UserNameEmailCell.module.css";
import cellClasses from "../crud-cells/Cell.module.css";
import { _PATH_FRONTEND } from "../../../../../path/path-frontend";
import { UserModel } from "../../../../../types/models/space-model";
import { Icons } from "../../../../../data/icons/icons";

type UserNameEmailCellProps = {
  cellConfig: UserNameEmailCellType;
  rowData: UserModel;
};

export const UserNameEmailCell: React.FC<UserNameEmailCellProps> = (
  props: UserNameEmailCellProps
) => {
  const {
    rowData: { name, surname, email },
    cellConfig,
  } = props;
  const isPending = name === "pending_invite";
  return (
    <Box component={Link} href="#" className={classes.parentGrid}>
      {isPending ? (
        <div className={`${classes.avatar} ${classes.pending}`}>
          <Icons.Send2 />
          <Text>Pending</Text>
        </div>
      ) : (
        <Avatar size={45} className={classes.avatar} />
      )}
      <div className={classes.infoColumn}>
        <Box className={classes.nameSection}>
          {!isPending && (
            <>
              <Text>{name}</Text>
              <Text>{surname}</Text>
            </>
          )}
        </Box>
        <Text>{email}</Text>
      </div>
      {/* <Text>root spaces...</Text> */}
    </Box>
  );
};
