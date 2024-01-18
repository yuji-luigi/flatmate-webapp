import { Container, Grid, Transition, Stack, Text } from '@mantine/core';
import { CheckType, MaintenanceModel } from '../../../../types/models/maintenance-check-type';
import { CheckInputTabCard } from './invoice-receipt-input/CheckInputTabCard';
import ProfileCoverStatic from '../../../../components/profile/ProfileCoverStatic';
import classes from '../../../../styles/global-useStyles.module.css';
import PostFeedCard from '../../../../components/posts/feed/PostFeedCard';
import { useCrudSelectors } from '../../../../redux/features/crud/crudSlice';
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
  const { openConfirmModal, closeModal } = useCustomModalContext();
  const { crudDocument: maintenance } = useCrudSelectors<MaintenanceModel>('maintenances');

  const handleOpenModal = () => {
    openConfirmModal({
      type: 'custom',
      fullScreen: true,
      centered: true,
      // title: 'Maintenance',
      withinPortal: true,
      children: (
        <>
          <PostFeedCard data={maintenance} showFullText />
        </>
      ),
    });
  };
  return (
    <Container className={classes.container} style={{ marginInline: 'auto' }}>
      <Transition mounted={pinOk} duration={500} transition="slide-up" timingFunction="ease-in-out">
        {(styles) => (
          <div style={styles}>
            <Grid align="stretch" gutter="md">
              <Grid.Col style={{ display: 'flex', flexDirection: 'column', gap: 16 }} span={12}>
                <Grid>
                  <Grid.Col span={{ sm: 6, xs: 12 }}>
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
                  <Grid.Col span={{ sm: 6, xs: 12 }}>
                    <CardStyled>
                      <Text component="h3" ta="center" fw={800} fz={30}>
                        Maintenance
                      </Text>
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
