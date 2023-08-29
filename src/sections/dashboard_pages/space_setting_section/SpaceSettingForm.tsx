import { useToggle, upperFirst } from '@mantine/hooks';
import { UseFormReturnType, useForm } from '@mantine/form';
import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  PaperProps,
  Button,
  Divider,
  Checkbox,
  Anchor,
  Stack,
  Grid,
  MultiSelect,
  Sx,
} from '@mantine/core';
// import { GoogleButton, TwitterButton } from '../SocialButtons/SocialButtons';
import { GoogleIcon } from '../../../components/social-buttons/GoogleIcon';
import { GoogleButton } from '../../../components/social-buttons/SocialButtons';
import { useCrudSelectors } from '../../../redux/features/crud/crudSlice';
import { SpaceSlugResponse } from '../../../types/api-response/space-response';
import CrudSelectMulti from '../../../components/input/crud-inputs/CrudSelectMulti';
import { usersTableData } from '../../../../json/dataTable/formfields/usersTableData';
import { UseFormReturnTypeCustom } from '../../../components/input/input_interfaces/useForm_interface';
import { getDefaultValues } from '../../../utils/getDefaultValues';
import { useMemo } from 'react';
import CrudTextInput from '../../../components/input/crud-inputs/CrudTextInput';
import { spacesTableData } from '../../../../json/dataTable/formfields/spacesTableData';
import FormFields from '../../../components/input/FormFields';

interface SpaceSettingFormProps {
  paperProp?: PaperProps;
  data: SpaceSlugResponse;
  sx?: Sx;
}

export function SpaceSettingForm(props: SpaceSettingFormProps) {
  const { data, paperProp } = props;
  const { space, maintainers } = data;
  // const [type, toggle] = useToggle(['login', 'register']);
  const initialValues = useMemo(() => getDefaultValues(spacesTableData, data.space), []);
  const form = useForm({
    initialValues /* : {
      name: space.name,
      address: space.address,
      admins: [space.administrator],
      maintainers: maintainers,
      password: space.password || '',
    }, */,

    validate: {
      password: (val) => (val.length <= 6 ? 'Password should include at least 6 characters' : null),
    },
  }) as UseFormReturnTypeCustom;

  return (
    <Paper radius="lg" p="xl" withBorder {...props}>
      <Text size="lg" weight={500} mb={8}>
        Settings for the building/space
      </Text>

      <form onSubmit={form.onSubmit(() => {})}>
        <Grid grow>
          <Item>
            {spacesTableData.map((formField) => (
              <FormFields formField={formField} form={form} />
            ))}
          </Item>
        </Grid>

        {/* <Group grow mb="md" mt="md">
          <GoogleButton radius="xl">Google</GoogleButton>
          <GoogleButton radius="xl">Google</GoogleButton>

        </Group> */}

        <Group position="right" mt="xl">
          <Button type="submit" radius="xl">
            Submit
          </Button>
        </Group>
      </form>
    </Paper>
  );
}

const Item = ({ ...others }: any) => {
  return <Grid.Col xs={12} sm={12} md={12} lg={5} xl={5} {...others} />;
};
