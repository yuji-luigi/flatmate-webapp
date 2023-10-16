import { useDisclosure } from '@mantine/hooks';

import { Menu, Modal, ActionIcon, Tooltip } from '@mantine/core';

import { useState } from 'react';
import { notifications } from '@mantine/notifications';
import { Icons } from '../../../data/icons/icons';
import { allSectionArrayWithRoles } from '../../../data';

import { FONT_SIZES } from '../../../lib/enums';
import { useCrudSelectors, useCrudSliceStore } from '../../../redux/features/crud/crudSlice';
import { SectionDataJsonWithRoles } from '../../../types/general/data/data-table/sectionsJson-type';
import { useSimpleDisclosureCtx } from '../../../../hooks/useSimpleDisclosureCtx';
import { ModalType } from '../../../types/modal/modal-context-type';
import { HeaderCreationModal } from './HeaderCreationModal';

export function HeaderCreationButton() {
  // const [opened, { open, close }] = useDisclosure(false);
  const { close, open, opened } = useSimpleDisclosureCtx();
  const [modalType, setModalType] = useState<'threads' | 'maintenances' | null>(null);
  const [section, setSection] = useState<SectionDataJsonWithRoles | null>(null);

  const { setSubmitting } = useCrudSliceStore();
  const { submitting } = useCrudSelectors();
  const handleOpenModal = (type: 'threads' | 'maintenances') => {
    setSection(allSectionArrayWithRoles.find((_section) => _section.entity === type) || null);
    setModalType(type);
    open();
  };
  const handleClose = () => {
    close();
    if (submitting) {
      notifications.hide('submit');
      notifications.show({
        title: 'Upload is cancelled',
        message: 'Upload cancelled because you closed a popup',
      });
    }
    setSubmitting(false);
  };

  return (
    <>
      <Menu shadow="lg">
        <Menu.Target>
          <ActionIcon variant="outline" size={18}>
            <Icons.plus />
          </ActionIcon>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Label style={{ textAlign: 'center' }}>Create something</Menu.Label>
          <Menu.Item
            onClick={() => handleOpenModal('threads')}
            style={{ fontSize: FONT_SIZES.menuItems }}
            icon={<Icons.article size={FONT_SIZES.menuItems} />}
          >
            New post
          </Menu.Item>
          <Menu.Item
            style={{ fontSize: FONT_SIZES.menuItems }}
            onClick={() => handleOpenModal('maintenances')}
            icon={<Icons.maintenance size={FONT_SIZES.menuItems} />}
          >
            Add maintenance
          </Menu.Item>
          <Menu.Item
            style={{ fontSize: FONT_SIZES.menuItems }}
            icon={<Icons.messageDots size={FONT_SIZES.menuItems} />}
          >
            Send message
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
      <HeaderCreationModal modalType={modalType} section={section} />
    </>
  );
}
