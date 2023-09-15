import React, { useState } from 'react';
import { Box, Button, Card, LoadingOverlay, Tabs, Text } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useRouter } from 'next/router';
import { notifications } from '@mantine/notifications';
import { handleUploadWithoutLogin } from '../../../../utils/upload-helper';
import { useCrudSelectors } from '../../../../redux/features/crud/crudSlice';
import { PATH_API } from '../../../../path/path-api';
import axiosInstance from '../../../../utils/axios-instance';
import { CheckType } from '../../../../types/models/check-type';
import { PATH_CLIENT } from '../../../../path/path-frontend';
import { sleep } from '../../../../utils/helpers/helper-functions';
import { MaintenanceModel } from '../../../../types/models/maintenance-model';
import { UseRouterWithCustomQuery } from '../../../../types/nextjs-custom-types/useRouter-types';
import { FileInputMantine } from '../../../../components/input/crud-inputs/FileInputMantine';

export const CheckInputTabCard = ({
  setCheckType,
  checkType = 'invoices',
}: {
  setCheckType: (type: CheckType) => void;
  checkType: CheckType;
}) => {
  const router: UseRouterWithCustomQuery = useRouter();
  const { query } = router;
  const [submitting, setSubmitting] = useState<boolean>(false);
  const { crudDocument: maintenance } = useCrudSelectors<MaintenanceModel>('maintenances');
  const form = useForm({
    initialValues: {
      type: checkType,
      invoices: new File([], 'invoices'),
      receipts: new File([], 'receipts'),
    },
  });
  if (!maintenance) {
    router.reload();
    return null;
  }

  const handleSubmit = async (e: any) => {
    try {
      e.preventDefault();
      setSubmitting(true);
      notifications.show({
        id: 'loading',
        loading: submitting,
        title: 'Uploading...',
        message: 'Please wait',
      });
      const fileData = form.values[checkType];
      if (fileData) {
        const uploadIds = await handleUploadWithoutLogin({
          files: fileData,
          mainSpace: maintenance.space.name,
          organizationName: maintenance.organization.name,
          entity: 'maintenances',
          endpoint: PATH_API.uploadsMaintenance,
        });

        const rawCheck = await axiosInstance.post(`${PATH_API.checks}/${checkType}`, {
          maintenance,
          files: uploadIds,
        });
        await sleep(600);
        if (rawCheck.data.success) {
          setSubmitting(false);
          router.push(`${PATH_CLIENT.uploadSuccess}/${query.linkId}/${rawCheck.data.data._id}`);
        }
      }
    } catch (error: any) {
      console.log(error);
    } finally {
      setSubmitting(false);
      notifications.hide('loading');
    }
  };

  const title = checkType === 'invoices' ? 'Upload Invoice' : 'Upload Receipt';

  const subtitle = `${maintenance.space.name} -${maintenance.title}`;

  return (
    <Tabs sx={{ width: '100%' }} defaultValue={checkType}>
      <LoadingOverlay visible={submitting} />
      <Tabs.List>
        <Tabs.Tab onClick={() => setCheckType('invoices')} value="invoices">
          Invoice
        </Tabs.Tab>
        <Tabs.Tab onClick={() => setCheckType('receipts')} value="receipts">
          Receipt
        </Tabs.Tab>
      </Tabs.List>
      <Card px={32} py={40}>
        <Box mb={16}>
          <Text fw={800} size={32}>
            {title}
          </Text>
          <Text fw={600}>{subtitle}</Text>
        </Box>
        <form onSubmit={handleSubmit}>
          <FileInputMantine
            form={form}
            formField={{
              id: 'checkType',
              name: checkType,
              label: 'upload file',
              type: 'attachment',
              multi: true,
              priority: 0,
            }}
          />

          <Button fullWidth type="submit" variant="light" color="blue">
            Submit
          </Button>
        </form>
      </Card>
    </Tabs>
  );
};
