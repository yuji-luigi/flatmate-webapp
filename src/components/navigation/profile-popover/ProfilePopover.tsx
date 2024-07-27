import { Popover, Text, Button, Group, Avatar, Box, Divider, Menu } from "@mantine/core";
import Link from "next/link";
import { t } from "i18next";
import useAuth from "../../../../hooks/useAuth";
import { Icons } from "../../../data/icons/icons";
import { _PATH_FRONTEND, PATH_CLIENT } from "../../../path/path-frontend";
import classes from "./ProfilePopover.module.css";
import { LanguageMenu } from "../../menu/LanguageMenu/LanguageMenu";
import { MenuSuperAdminSwitch } from "./MenuSuperAdminSwitch";

export function ProfilePopover() {
  const { user } = useAuth();
  const popoverList = useGetPopoverList();
  return (
    <Menu position="bottom" withArrow shadow="md">
      <div className={classes.grid}>
        <Menu.Target>
          <Avatar className={classes.avatar} size={50} />
        </Menu.Target>
        <div className={classes.flexVertical}>
          <Text className={classes.profileText} fw={700}>
            {user?.name} {user?.surname}
          </Text>
          <Text className={classes.profileText} fw={500}>
            {user?.email}
          </Text>
          <LanguageMenu />
        </div>
      </div>
      <Menu.Dropdown>
        <Menu.Label style={{ textAlign: "center" }}>Settings</Menu.Label>
        <Box px={8} py={16}>
          {/* // TODO: onhover change color */}
          {popoverList.map((list) => (
            <Menu.Item
              component={Link}
              key={list.title}
              className={classes.link}
              href={list.link}
              leftSection={list.icon}
            >
              {list.title}
            </Menu.Item>
          ))}
          <MenuSuperAdminSwitch />
        </Box>
      </Menu.Dropdown>
    </Menu>
  );
}

const useGetPopoverList = () => {
  const { user } = useAuth();
  return [
    {
      title: "Edit profile",
      icon: <Icons.user />,
      link: `/${user?.loggedAs}/profile`,
    },
  ];
};
