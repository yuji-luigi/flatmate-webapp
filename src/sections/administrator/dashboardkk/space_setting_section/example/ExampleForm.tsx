// import { useForm as useHookForm, FormProvider } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { z } from 'zod';
import { Button, Grid, ColProps, useMantineTheme, TextInput, Paper } from '@mantine/core';
// import { ControllerProps } from 'types';
// import { FormController } from '@components/Form';
import { IconCheck, IconX } from '@tabler/icons-react';
import { exampleFormFields } from './exampleFormFields';
import FormFields from '../../../../../components/input/FormFields';
import { useForm } from '@mantine/form';
import { spacesTableData } from '../../../../../../json/dataTable/formfields/spacesTableData';
import { FormFieldTypes } from '../../../../../types/general/data/data-table/form-field-type/formField-types';

const ExampleForm = () => {
  const theme = useMantineTheme();

  const form = useForm();
  console.log(JSON.stringify(spacesTableData));
  return (
    <form>
      <Paper radius="md" style={{ padding: 24 }} withBorder>
        <Grid justify="center" grow gutter="xl" style={{ columnGap: 8, margin: 0 }}>
          {spacesTableData.map((field, index) => {
            const { col }: { col?: ColProps } = field;
            return (
              <Grid.Col
                // span={6}
                xs={12}
                sm={12}
                md={5}
                lg={5}
                key={`${field.name}-${index}`}
                style={{ padding: 0, width: '100%' }}
                {...col}
              >
                <FormFields formField={field as unknown as FormFieldTypes} form={form} />
              </Grid.Col>
            );
          })}
          <Grid.Col xs={3.5} sm={2.5} md={2.5} lg={2.5} xl={2.5} mt={10}>
            <Button type="submit" fullWidth>
              yes
            </Button>
          </Grid.Col>
        </Grid>
      </Paper>
    </form>
  );
};

export default ExampleForm;
