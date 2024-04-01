import { Avatar, Text, Group, Card, Box } from "@mantine/core";
import { useTranslation } from "next-i18next";
import classes from "./NewPostInFeed.module.css";
import { useSimpleDisclosureContext } from "../../../context/SimpleDisclosureContext";
import { HeaderCreationModal } from "../../modal/header-creation-modal/HeaderCreationModal";

export function NewPostInFeed() {
  const { t } = useTranslation("common");
  const { open } = useSimpleDisclosureContext();
  const handleOpenModal = () => {
    open();
  };
  return (
    <>
      <Card className={classes.card}>
        <Group className={classes.parentGroup}>
          <Avatar
            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80"
            size={40}
            radius="100%"
          />
          <Box className={classes.inputBox} onClick={handleOpenModal}>
            <Text fz="xs" tt="uppercase" fw={700} c="dark">
              {t("Post something")}
            </Text>
          </Box>
        </Group>
      </Card>
      <HeaderCreationModal modalType="threads" title="create post" />
    </>
  );
}
