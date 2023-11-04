import React, { useState } from 'react';
import { Box, Button, Card, LoadingOverlay, Tabs, Text } from '@mantine/core';
import { UseFormReturnType, useForm } from '@mantine/form';
import { useRouter } from 'next/router';
import { notifications, showNotification } from '@mantine/notifications';
import {
  handleUploadWithoutLogin,
  isCustomFile,
  isCustomFiles,
} from '../../../../../utils/upload-helper';
import { useCrudSelectors } from '../../../../../redux/features/crud/crudSlice';
import { PATH_API } from '../../../../../path/path-api';
import axiosInstance from '../../../../../utils/axios-instance';
import { CheckType } from '../../../../../types/models/maintenance-check-type';
import { PATH_CLIENT } from '../../../../../path/path-frontend';
import { sleep } from '../../../../../utils/helpers/helper-functions';
import { MaintenanceModel } from '../../../../../types/models/maintenance-model';
import { UseRouterWithCustomQuery } from '../../../../../types/nextjs-custom-types/useRouter-types';
import { FileInputMantine } from '../../../../../components/input/crud-inputs/crud-file-input/FileInputMantine';
import { FileWithPreview } from '../../../../../types/files/file-types';
import { CardStyled } from '../../../../../styles/card/CardStyled';
import { checksTableData } from '../../../../../../json/dataTable/formfields/checksTableData';
import FormFields from '../../../../../components/input/FormFields';
import { NOTIFICATIONS } from '../../../../../data/showNofification/notificationObjects';

type CheckForm = {
  type: CheckType;
  invoices: FileWithPreview[] | null;
  receipts: FileWithPreview[] | null;
};

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
  const form = useForm<Record<string, unknown>>({
    initialValues: {
      type: checkType,
    },
  });
  if (!maintenance) {
    router.reload();
    return null;
  }

  const handleChangeTab = (value: string | null) => {
    setCheckType(value as CheckType);
    form.setValues({ ...form.values, type: value });
  };

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
      const fileData = form.values.files;
      if (!fileData || form.values.total === undefined) {
        showNotification({
          message: 'Please Select a file and fill the total price',
          color: 'orange',
        });
        return;
      }
      //
      if (isCustomFiles(fileData)) {
        const uploadIds = await handleUploadWithoutLogin({
          files: fileData,
          mainSpace: maintenance.space.name,
          organizationName: maintenance.organization.name,
          entity: 'maintenances',
          endpoint: PATH_API.uploadsMaintenance,
        });
        const rawCheck = await axiosInstance.post(`${PATH_API.checks}`, {
          maintenance,
          ...form.values,
          files: uploadIds,
          entity: 'maintenances',
        });
        await sleep(600);
        if (rawCheck.data.success) {
          setSubmitting(false);
          router.push(`${PATH_CLIENT.uploadSuccess}/${query.linkId}/${rawCheck.data.data._id}`);
        }
      }
    } catch (error: any) {
      // eslint-disable-next-line no-console
      showNotification(NOTIFICATIONS.ERROR.general({ data: error }));
      console.error(error);
    } finally {
      setSubmitting(false);
      notifications.hide('loading');
    }
  };

  const title = checkType === 'invoices' ? 'Upload Invoice' : 'Upload Receipt';

  return (
    <Tabs onChange={handleChangeTab} style={{ width: '100%' }} defaultValue={checkType}>
      <LoadingOverlay visible={submitting} />
      <Tabs.List>
        <Tabs.Tab value="invoices">Invoice</Tabs.Tab>
        <Tabs.Tab value="receipts">Receipt</Tabs.Tab>
      </Tabs.List>
      <CardStyled px={32} py={40}>
        <Box mb={16}>
          <Text fw={800} fz={32}>
            {title}
          </Text>
        </Box>
        <form onSubmit={handleSubmit}>
          {/* {checkType === 'invoices' && ( */}
          <FileInputMantine
            form={form}
            fileFolder={checkType}
            formField={{
              id: 'files',
              name: 'files',
              label: 'Choose file',
              type: 'attachment',
              multi: true,
              priority: 0,
            }}
          />
          {/* )}
          {checkType === 'receipts' && (
            <FileInputMantine
              form={form}
              fileFolder={checkType}
              formField={{
                id: 'receipts',
                name: 'receipts',
                label: 'Choose file',
                type: 'attachment',
                multi: true,
                priority: 0,
              }}
            />
          )} */}
          {checksTableData.map((formField) => (
            <FormFields formField={formField} key={formField.id} form={form} />
          ))}
          <Button mt={16} fullWidth type="submit" variant="filled" color="blue">
            Submit
          </Button>
        </form>
      </CardStyled>
    </Tabs>
  );
};
