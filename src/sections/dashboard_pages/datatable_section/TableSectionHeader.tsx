import { useRouter } from 'next/router';
import {
  Box,
  Button,
  Container,
  Group,
  Stack,
  Sx,
  createStyles,
  Text,
  LoadingOverlay,
} from '@mantine/core';
import { useEffect } from 'react';
import { flattenSectionData, sectionData } from '../../../data';
import { useDrawerContext } from '../../../context/DataTableDrawerContext';
import { BreadcrumbsCustom } from './BreadcrumbsCustom';
import useLayoutContext from '../../../../hooks/useLayoutContext';
import { useCrudSliceStore } from '../../../redux/features/crud/crudSlice';
import { PATH_API } from '../../../path/api-routes';
import axiosInstance from '../../../utils/axios-instance';
import { Sections } from '../../../types/general/data/sections-type';
import { dashboardStyle } from '../../../styles/global-useStyles';
import { CrudTableButtons } from './components/CrudTableButtons';
import { ParsedQueryCustom } from '../../../types/nextjs-custom-types/useRouter-types';

const useStyles = dashboardStyle;
function instanceOfParentDataInterface(object: any): object is ParentDataInterface {
  return 'name' in object;
}
export function TableSectionHeader({
  overridingEntity = '',
  sx = {},
  children,
}: {
  sx?: Sx;
  overridingEntity?: Sections | '';
  children?: React.ReactNode;
}) {
  /** define open state for crudDrawer component */

  const { setBreadcrumbs, breadcrumbs, setPrevBreadcrumbs, parentData } = useLayoutContext();

  /** use style defined above */
  const { classes } = useStyles();
  /** get url string by useRouter */
  const { query }: { query: ParsedQueryCustom } = useRouter();

  /** get entity from url using useRouter().query */
  let { entity } = query;
  entity = overridingEntity || entity; // if overridingEntity is present entity is set to override one

  const section = flattenSectionData.find((data) => data.entity === entity);

  useEffect(() => {
    /** entity is possibly null */
    if (entity) {
      const regex = /^\w/;
      const title = entity.replace(regex, (c: string) => c.toUpperCase());
      /** TODO: fix hardcoded /dashboard */
      setBreadcrumbs({ title, href: `/dashboard/${entity}` });
      setPrevBreadcrumbs(breadcrumbs);
    }
    /** if null is passed set to [] in condition. */
    return () => setBreadcrumbs(null);
  }, [query.entity]);

  /** define case when theres no entity,
   * seem like gives an error in other component
   */
  if (!section) {
    return <p>loading...</p>;
  }
  /** define openDrawer function. Button onClick openDrawer */

  // function handleOpenDrawer() {
  //   if (typeof entity !== 'undefined') {
  //     selectCrudDocument({ entity, document: null });
  //   }
  //   openDrawer();
  // }

  let { title } = section;
  if (query.parentId && instanceOfParentDataInterface(parentData)) {
    title = parentData.name;
  }
  if (!entity) return <LoadingOverlay visible />;
  return (
    <>
      <Group className={classes.headerWrapper} sx={sx}>
        <Stack align="start" justify="flex-start">
          <Text size={32} fw={700}>
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
