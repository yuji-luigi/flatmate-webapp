import { Group, ActionIcon, createStyles, Menu } from '@mantine/core';
import React, { useEffect } from 'react';
import useAuth from '../../../hooks/useAuth';
import { Icons } from '../../data/icons/icons';
import { FONT_SIZES } from '../../lib/enums';
import { IconBookmark, IconDots, IconHeart, IconSettings, IconShare } from '@tabler/icons-react';
import { useCrudSelectors, useCrudSliceStore } from '../../redux/features/crud/crudSlice';
import { useDrawerContext } from '../../context/DataTableDrawerContext';
import { useRouter } from 'next/router';
import { Sections } from '../../types/general/data/sections-type';
import { PATH_CLIENT } from '../../path/path-frontend';
import { AllModels } from '../../types/models/allmodels';
import { ThreadModel } from '../../types/models/thread-model';
import { MaintenanceModel } from '../../types/models/maintenance-model';

const useStyles = createStyles((theme) => ({
  action: {
    background-color: light-dark(var(--mantine-color-gray-6), var(--mantine-color-dark-0)),
    &:hover{
      background-color: light-dark(var(--mantine-color-gray-5), var(--mantine-color-dark-1)),
    }),
  },
}));
const PostEditButton = ({
  data,
  entity,
}: {
  data: ThreadModel | MaintenanceModel;
  entity: Sections;
}) => {
  const { user } = useAuth();

  const router = useRouter();

  const { selectCrudDocument, deleteCrudDocumentWithPagination } = useCrudSliceStore();

  const { openDrawer } = useDrawerContext();

  const { classes, cx, theme } = useStyles();
  const handleClicked = () => selectCrudDocument({ document: data, entity });
  const handleEditClicked = () => openDrawer();
  // useEffect(() => {
  //   return () => selectCrudDocument({ document: null, entity });
  // }, []);
  const handleDeleteClicked = () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      deleteCrudDocumentWithPagination({ documentId: data._id, entity });
      router.push(PATH_CLIENT.posts);
    }
  };
  return (
    <>
      {(user?._id === data.createdBy._id || data.createdBy?.role === 'super_admin') && (
        <Group position="right" mb={10}>
          <Menu shadow="lg">
            <Menu.Target>
              <ActionIcon onClick={handleClicked}>
                <IconDots />
              </ActionIcon>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item
                onClick={handleEditClicked}
                style={{ fontSize: FONT_SIZES.menuItemsS }}
                icon={<Icons.article size={FONT_SIZES.menuItemsS} />}
              >
                Edit
              </Menu.Item>
              <Menu.Item
                style={{ fontSize: FONT_SIZES.menuItemsS }}
                icon={<Icons.archive size={FONT_SIZES.menuItemsS} />}
              >
                Mark as draft
              </Menu.Item>
              <Menu.Item
                onClick={handleDeleteClicked}
                style={{
                  fontSize: FONT_SIZES.menuItemsS,
                  color: 'red',
                  // '&:hover': {
                  //   background:
                  //     light-dark(var(--mantine-color-gray-5), var(--mantine-color-dark-1)),
                  // },
                }}
                icon={<Icons.trash color="red" size={FONT_SIZES.menuItemsS} />}
              >
                Delete
              </Menu.Item>
              {/* <Menu.Item
          icon={<IconSearch size={14} />}
          rightSection={
            <Text size="xs" color="dimmed">
              ⌘K
            </Text>
          }
        >
          Search
        </Menu.Item> */}

              <Menu.Divider />

              {/* <Menu.Label>Danger zone</Menu.Label>
        <Menu.Item icon={<IconArrowsLeftRight size={14} />}>Transfer my data</Menu.Item>
        <Menu.Item color="red" icon={<IconTrash size={14} />}>
          Delete my account
        </Menu.Item> */}
            </Menu.Dropdown>
          </Menu>
        </Group>
      )}
    </>
  );
};

export default PostEditButton;
