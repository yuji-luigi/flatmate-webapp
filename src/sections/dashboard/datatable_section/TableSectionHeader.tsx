import { useRouter } from "next/router";
import { Group, Stack, Text, LoadingOverlay, MantineStyleProp } from "@mantine/core";
import { useEffect } from "react";
import { getFlattenSectionJson } from "../../../json/section-json";
import { BreadcrumbsCustom } from "./BreadcrumbsCustom";
import useLayoutContext from "../../../../hooks/useLayoutContext";
import classes from "../../../styles/global-useStyles.module.css";
import { CrudTableButtons } from "./components/CrudTableButtons";
import { ParsedQueryCustom } from "../../../types/nextjs-custom-types/useRouter-types";
import { useCurrentEntityContext } from "../../../context/CurrentEntityContext";
import { Entity } from "../../../types/redux/CrudSliceInterfaces";
import useAuth from "../../../../hooks/useAuth";

function instanceOfParentDataInterface(object: any): object is ParentDataInterface {
  return "name" in object;
}
export function TableSectionHeader({
  overridingEntity = "",
  style = {},
  children,
}: {
  style?: MantineStyleProp;
  overridingEntity?: Entity | "";
  children?: React.ReactNode;
}) {
  /** define open state for crudDrawer component */
  const { user } = useAuth();
  const { setBreadcrumbs, breadcrumbs, setPrevBreadcrumbs, parentData } = useLayoutContext();

  const { query }: { query: ParsedQueryCustom } = useRouter();
  const { currentEntity: entity } = useCurrentEntityContext();

  useEffect(() => {
    /** entity is possibly null */
    if (entity) {
      const regex = /^\w/;
      const title = entity.replace(regex, (c: string) => c.toUpperCase());
      /** TODO: fix hardcoded /dashboard */
      setBreadcrumbs({ title, href: `/dashboard/${entity}` });
      setPrevBreadcrumbs(breadcrumbs);
    }
    return () => setBreadcrumbs(null);
  }, [entity]);

  if (!user) return <LoadingOverlay visible />;

  const section = getFlattenSectionJson(user.loggedAs).find((data) => data.entity === entity);

  if (!section) {
    return <p>loading...</p>;
  }

  let { title } = section;
  if (query.parentId && instanceOfParentDataInterface(parentData)) {
    title = parentData.name;
  }
  if (!entity) return <LoadingOverlay visible />;
  return (
    <>
      <Group className={classes.headerWrapper} style={style}>
        <Stack align="start" justify="flex-start">
          <Text fz={32} fw={700}>
            {title}
          </Text>
          <BreadcrumbsCustom />
        </Stack>
        <CrudTableButtons entity={entity} section={section} />
      </Group>
      {children}
    </>
  );
}
