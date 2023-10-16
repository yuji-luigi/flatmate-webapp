import {
  ActionIcon,
  Box,
  Container,
  Grid,
  Title,
  Transition,
  useMantineTheme,
  Divider,
  Stack,
} from '@mantine/core';
import React from 'react';
import { CloseIcon } from 'yet-another-react-lightbox';
import { CheckType } from '../../../../types/models/check-type';
import { CheckInputTabCard } from './invoice-receipt-input/CheckInputTabCard';
import ProfileCoverStatic from '../../../../components/profile/ProfileCoverStatic';
import { profilePageStyle } from '../../../../styles/global-useStyles';
import PostFeedCard from '../../../../components/posts/feed/PostFeedCard';
import { useCrudSelectors } from '../../../../redux/features/crud/crudSlice';
import { MaintenanceModel } from '../../../../types/models/maintenance-model';
import { useCustomModalContext } from '../../../../context/modal-context/_ModalContext';
import { CardStyled } from '../../../../styles/card/CardStyled';
import { AdminCard } from './AdminCard';

type Props = {
  pinOk: boolean;
  checkType: CheckType | null;
  setCheckType: (type: CheckType | null) => void;
};

export const MaintenanceCheckUploadSection = (props: Props) => {
  const { pinOk, checkType, setCheckType } = props;
  const theme = useMantineTheme();
  const { classes: classes2 } = profilePageStyle();
  const { openConfirmModal, closeModal } = useCustomModalContext();
  const { crudDocument: maintenance } = useCrudSelectors<MaintenanceModel>('maintenances');

  if (!maintenance) return null;
  const handleOpenModal = () => {
    openConfirmModal({
      type: 'custom',
      fullScreen: true,
      centered: true,
      title: 'Maintenance',
      withinPortal: true,
      children: (
        <Box pt={56}>
          <ActionIcon onClick={() => closeModal()}>
            <CloseIcon />
          </ActionIcon>
          <PostFeedCard
            data={maintenance}
            // popupFn={handleOpenModal}
          />
        </Box>
      ),
    });
  };
  return (
    <Container className={classes2.container} style={{ marginInline: 'auto' }}>
      <Transition mounted={pinOk} duration={500} transition="slide-up" timingFunction="ease-in-out">
        {(styles) => (
          <div style={styles}>
            <Grid align="stretch" gutter="md">
              <Grid.Col style={{ display: 'flex', flex-direction: 'column', gap: 16 }} span={12}>
                <Grid>
                  <Grid.Col sm={6} xs={12}>
                    <Stack style={{ height: '100%' }}>
                      <CardStyled>
                        <CheckInputTabCard
                          setCheckType={setCheckType}
                          checkType={checkType || 'invoices'}
                        />
                      </CardStyled>
                      <ProfileCoverStatic
                        {...maintenance.space}
                        description={maintenance.space.address}
                        disableAvatar
                      />
                    </Stack>
                  </Grid.Col>
                  <Grid.Col sm={6} xs={12}>
                    <CardStyled>
                      <Divider
                        label={<Title align="center">Maintenance</Title>}
                        labelPosition="center"
                        mb={var(--mantine-spacing-md)}
                      />
                      <PostFeedCard data={maintenance} popupFn={handleOpenModal} />
                    </CardStyled>
                  </Grid.Col>
                  <Grid.Col span={12}>
                    <AdminCard admins={maintenance.space.admins} />
                  </Grid.Col>
                </Grid>
                {/* </Grid.Col> */}
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
