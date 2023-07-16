import React from 'react';
import { DropzoneMantine } from '../../../components/input/mantine-default/DropzoneMaintine';
import { Box, Button, Card, Text, Title, createStyles } from '@mantine/core';
import { UseFormReturnTypeCustom } from '../../../components/input/input_interfaces/useForm_interface';
import { useForm } from '@mantine/form';
import { handleUploadFiles, isCustomFile } from '../../../utils/upload-helper';

const useStyles = createStyles((theme) => ({
  inputGroup: {
    marginBottom: theme.spacing.xl,
  },
  label: {
    fontWeight: 700,
    marginBlock: theme.spacing.md,
  },
}));
export const InvoiceReceiptInput = () => {
  const { classes } = useStyles();

  const form = useForm({
    initialValues: {
      invoice: new File([], 'invoice'),
    },
  });

  const handleSubmit = async (e: any) => {
    try {
      e.preventDefault();
      if (isCustomFile(form.values.invoice)) {
        await handleUploadFiles([form.values.invoice]);
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <Card px={32} py={40}>
      <Title mb={32}>Upload Invoice and Receipt</Title>
      <form onSubmit={handleSubmit}>
        <Box className={classes.inputGroup}>
          <Text className={classes.label}>Invoice</Text>
          <DropzoneMantine form={form} />
        </Box>
        <Button fullWidth type="submit" variant="light" color="blue">
          Submit
        </Button>
      </form>
    </Card>
  );
};
