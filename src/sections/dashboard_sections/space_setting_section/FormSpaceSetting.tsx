import { useToggle, upperFirst } from '@mantine/hooks';
import { useForm } from '@mantine/form';
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

interface FormSpaceSettingProps {
  paperProp?: PaperProps;
  data: SpaceSlugResponse;
  sx?: Sx;
}

export function FormSpaceSetting(props: FormSpaceSettingProps) {
  const { data, paperProp } = props;
  const { space, maintainers } = data;
  // const [type, toggle] = useToggle(['login', 'register']);
  const form = useForm({
    initialValues: {
      name: space.name,
      address: space.address,
      admins: [space.administrator],
      maintainers: maintainers,
      password: space.password || '',
    },

    validate: {
      password: (val) => (val.length <= 6 ? 'Password should include at least 6 characters' : null),
    },
  });

  return (
    <Paper radius="md" p="xl" withBorder {...props}>
      <Text size="lg" weight={500} mb={8}>
        Settings for the building/space
      </Text>

      <form onSubmit={form.onSubmit(() => {})}>
        <Grid grow>
          <Item>
            <TextInput
              label="Name"
              placeholder="Name building"
              value={form.values.name}
              onChange={(event) => form.setFieldValue('name', event.currentTarget.value)}
              radius="md"
            />
          </Item>
          <Item>
            <TextInput
              required
              label="Address"
              placeholder="Address"
              value={form.values.address}
              onChange={(event) => form.setFieldValue('address', event.currentTarget.value)}
              error={form.errors.address && 'Invalid email'}
              radius="md"
            />
          </Item>
          <Item>
            <MultiSelect
              required
              name="admins"
              label="Administrators"
              placeholder=""
              data={['admin1', 'admin2', 'admin3']}
              onChange={(selectedValues) => form.setFieldValue('admins', selectedValues)}
              error={form.errors.admins && 'Invalid email'}
              radius="md"
            />
          </Item>
          <Item>
            <MultiSelect
              required
              name="maintainers"
              label="Maintainers"
              placeholder=""
              data={['idraulica', 'strutturale', 'muratore']}
              onChange={(event) => form.setFieldValue('admins', event)}
              error={form.errors.admins && 'Invalid email'}
              radius="md"
            />
          </Item>
          <Item>
            <PasswordInput
              required
              label="Password"
              placeholder="Your password"
              value={form.values.password}
              onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
              error={form.errors.password && 'Password should include at least 6 characters'}
              radius="md"
            />
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
