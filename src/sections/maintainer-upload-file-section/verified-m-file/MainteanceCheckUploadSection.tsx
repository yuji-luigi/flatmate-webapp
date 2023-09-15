import {
  ActionIcon,
  Box,
  Card,
  Container,
  Grid,
  SimpleGrid,
  Skeleton,
  Stack,
  Title,
  Transition,
  createStyles,
  rem,
  Text,
  useMantineTheme,
  Divider,
  Group,
} from '@mantine/core';
import React from 'react';
import { CloseIcon } from 'yet-another-react-lightbox';
import { ChooseTypeCard } from './ChooseTypeCard';
import { CheckType } from '../../../types/models/check-type';
import { CheckInputTabCard } from './invoice-receipt-input/CheckInputTabCard';
import ProfileCoverGeneric from '../../../components/profile/ProfileCoverGeneric';
import ProfileCoverStatic from '../../../components/profile/ProfileCoverStatic';
import { profilePageStyle } from '../../../styles/global-useStyles';
import PostFeedCard from '../../../components/posts/feed/PostFeedCard';
import { useCrudSelectors } from '../../../redux/features/crud/crudSlice';
import { MaintenanceModel } from '../../../types/models/maintenance-model';
import MaintenancePage from '../../../pages/dashboard/maintenances/[documentId]';
import { use_ModalContext } from '../../../context/modal-context/_ModalContext';
import { CardStyled } from '../../../styles/card/CardStyled';
import { AdminCard } from './AdminCard';
import { GRID_HEIGHT_M_FILE } from './grid-height-m-file';

type Props = {
  pinOk: boolean;
  checkType: CheckType | null;
  setCheckType: (type: CheckType | null) => void;
};

const PRIMARY_COL_HEIGHT = rem(300);

export const MaintenanceCheckUploadSection = (props: Props) => {
  const { pinOk, checkType, setCheckType } = props;
  const theme = useMantineTheme();
  const { classes: classes2 } = profilePageStyle();
  const { openConfirmModal, closeModal } = use_ModalContext();
  const SECONDARY_COL_HEIGHT = `calc(${PRIMARY_COL_HEIGHT} / 2 - ${theme.spacing.md} / 2)`;
  const { crudDocument: maintenance } = useCrudSelectors<MaintenanceModel>('maintenances');

  if (!maintenance) return null;
  const handleOpenModal = () => {
    openConfirmModal({
      type: 'custom',
      fullScreen: true,
      centered: true,
      onConfirm: () => console.log('confirm'),
      title: 'Maintenance',
      withinPortal: true,
      children: (
        <Box pt={56}>
          <ActionIcon onClick={() => closeModal()}>
            <CloseIcon />
          </ActionIcon>
          <PostFeedCard
            {...maintenance}
            _id={maintenance._id}
            body={maintenance.description}
            showFullText
            // popupFn={handleOpenModal}
          />
        </Box>
      ),
    });
  };
  return (
    <Container className={classes2.container} sx={{ marginInline: 'auto' }}>
      <Transition mounted={pinOk} duration={500} transition="slide-up" timingFunction="ease-in-out">
        {(styles) => (
          <div style={styles}>
            <Grid align="stretch" gutter="md">
              <Grid.Col style={{ display: 'flex', flexDirection: 'column', gap: 16 }} span={12}>
                <Grid>
                  <Grid.Col sm={8} xs={12}>
                    <CardStyled>
                      <CheckInputTabCard
                        setCheckType={setCheckType}
                        checkType={checkType || 'invoices'}
                      />
                    </CardStyled>
                  </Grid.Col>
                  <Grid.Col sm={4} xs={12}>
                    <ProfileCoverStatic
                      {...maintenance.space}
                      description={maintenance.space.address}
                      disableAvatar
                    />
                  </Grid.Col>
                  <Grid.Col span={12}>
                    <AdminCard admins={maintenance.space.admins} />
                  </Grid.Col>
                </Grid>
                {/* </Grid.Col> */}
                <Box>
                  <Divider
                    label={<Title align="center">Maintenance</Title>}
                    labelPosition="center"
                    mb={theme.spacing.md}
                  />
                  <PostFeedCard
                    {...maintenance}
                    body={maintenance.description}
                    createdAt={maintenance.createdAt}
                    popupFn={handleOpenModal}
                  />
                </Box>
              </Grid.Col>
            </Grid>
            {/* <Grid>
              <Grid.Col span={12}>
                <AdminCard admins={maintenance.space.admins} />
              </Grid.Col>
            </Grid> */}
            {/* </SimpleGrid> */}
          </div>
        )}
      </Transition>
    </Container>
  );
};
