import { Stack } from "@mantine/core";
import { NavbarVerticalItem } from "./NavbarVerticalItem";
import { RootNavConfig } from "../../../json/nav-config";
import useAuth from "../../../../hooks/useAuth";
import { NavConfig } from "../../../types/data/json/sections-json";

type NavListProps = {
  section: NavConfig;
};

export const NavList: React.FC<NavListProps> = (props: NavListProps) => {
  const { section } = props;
  const { user } = useAuth();
  // const show = user?.isSuperAdmin;
  return (
    <>
      {true && !section.hide && (
        <Stack align="start">
          <p>{section.name}</p>
          {section.contents.map((navbarContent) => (
            <NavbarVerticalItem key={navbarContent.title} navbarContent={navbarContent} />
          ))}
        </Stack>
      )}
    </>
  );
};
