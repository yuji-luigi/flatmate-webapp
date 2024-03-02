import { Accordion, Box, Group, Text } from '@mantine/core';
import { t } from 'i18next';
import classes from './AccessControllerDisplay.module.css';
import { SpaceModel } from '../../../../../../types/models/space-model';
import { useItemSlice } from '../../../../../../redux/features/crud/selectedItemSlice';
import { Icons } from '../../../../../../data/icons/icons';

type AccessControllerDisplayProps = {
  aCtrlValues: Record<string, boolean>[] | null;
};

export const AccessControllerDisplay: React.FC<AccessControllerDisplayProps> = (
  props: AccessControllerDisplayProps
) => {
  const { get } = useItemSlice<{ space?: null | SpaceModel }>();
  const { aCtrlValues } = props;
  if (!aCtrlValues?.length) return null;
  return (
    <>
      <Accordion className={classes.accordion} chevronPosition="right" variant="contained">
        <Accordion.Item value="a">
          <Accordion.Control>
            {get?.space?.name}
            {t(" : See user's granted accesses")}
          </Accordion.Control>
          <Box className={classes.contentsContainer}>
            {aCtrlValues.map((ctrlV) => (
              <Accordion.Panel key={ctrlV.roleName.toString()} className={classes.accordionPanel}>
                <Text fw="bold" mb={4}>
                  {ctrlV.roleName}
                </Text>
                <PermissionTile permission="Create post" allowed={ctrlV.canCreatePosts} />
                <PermissionTile
                  permission="Create maintenance"
                  allowed={ctrlV.canCreateMaintenances}
                />
                <PermissionTile
                  permission="Notify Maintener"
                  allowed={ctrlV.canNotifyMaintainers}
                />
                <PermissionTile permission="Delete post" allowed={ctrlV.canDeletePosts} />
                <PermissionTile
                  permission="Delete maintenance"
                  allowed={ctrlV.canDeleteMaintenances}
                />
                <PermissionTile permission="Delete comment" allowed={ctrlV.canDeleteComments} />
              </Accordion.Panel>
            ))}
          </Box>
        </Accordion.Item>
      </Accordion>
    </>
  );
};

function PermissionTile({ permission, allowed }: { permission: string; allowed: boolean }) {
  console.log(allowed);
  return (
    <Group justify="space-between" style={{ width: '100%' }}>
      <Text>{permission}</Text>
      {allowed ? (
        <Icons.check style={{ color: 'var(--mantine-color-green-6)' }} size={20} />
      ) : (
        <Icons.close
          style={{
            color: 'var(--mantine-color-red-6)',
          }}
          size={20}
        />
      )}
    </Group>
  );
}
