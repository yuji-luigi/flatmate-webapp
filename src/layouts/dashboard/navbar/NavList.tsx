import { Stack } from "@mantine/core";
import { NavbarVerticalItem } from "./NavbarVerticalItem";
import { SectionData } from "../../../json/section-json";
import useAuth from "../../../../hooks/useAuth";

type NavListProps = {
  section: SectionData[number];
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
          {/* contents are sections: Top, posts,,, */}
          {section.contents.map((navbarContent) => (
            <NavbarVerticalItem key={navbarContent.navbarTitle} navbarContent={navbarContent} />
          ))}
        </Stack>
      )}
    </>
  );
};
