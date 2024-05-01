import { Anchor, Select, rem } from "@mantine/core";
import { IconPhoto } from "@tabler/icons-react";
import { ReactNode } from "react";
import { Role } from "../../types/models/space-model";

export type RoleTabsLoginProps = {};

export const tabs: {
  value: "Users" | "Administrators" | "Maintainers";
  role: Role;
  component: ReactNode;
}[] = [
  {
    value: "Users",
    role: "inhabitant",
    component: "Administrators",
  },
  {
    value: "Administrators",
    role: "property_manager",
    component: "Administrators",
  },
  {
    value: "Maintainers",
    role: "maintainer",
    component: "Administrators",
  },
];
