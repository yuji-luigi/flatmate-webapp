import { useForm } from "@mantine/form";
import { Text, Paper, Group, PaperProps, Button, Grid, Sx } from "@mantine/core";
// import { GoogleButton, TwitterButton } from '../SocialButtons/SocialButtons';

import { useEffect, useMemo } from "react";
import { SpaceSlugResponse } from "../../../types/api-response/space-response";

import { UseFormReturnTypeCustom } from "../../../components/input/input_interfaces/useForm_interface";
import { getDefaultValues } from "../../../utils/getDefaultValues";
import { spacesTableData } from "../../../../json/dataTable/formfields/spacesTableData";
import FormFields from "../../../components/input/FormFields";
import { useCrudSelectors, useCrudSliceStore } from "../../../redux/features/crud/crudSlice";
import { SpaceModel } from "../../../types/models/space-model";

const filteredTableData = spacesTableData.filter(
  (item) => item.id !== "organization" && item.id !== "isTail" && item.id !== "isMain"
);
interface SpaceSettingFormProps {
  paperProp?: PaperProps;
  data?: SpaceModel;
  style?: Sx;
  isSpaceAdmin?: boolean;
}
const entity = "spaces";
export function SpaceSettingForm(props: SpaceSettingFormProps) {
  const { isSpaceAdmin } = props;

  const { crudDocument: space } = useCrudSelectors("spaces");
  const { updateCrudDocument } = useCrudSliceStore();

  const initialValues = useMemo(() => {
    return getDefaultValues(filteredTableData, space);
  }, [space?._id]);

  const form = useForm({
    initialValues,
  }) as UseFormReturnTypeCustom;

  const handleSubmit = (data: Record<string, any>) => {
    if (space) {
      updateCrudDocument({ entity, updateData: data, documentId: space._id });
    }
  };

  useEffect(() => {
    form.setValues(initialValues);
  }, [initialValues]);

  return (
    <Paper radius="lg" p="xl" withBorder {...props}>
      <Text size="lg" fw={500} mb={8}>
        Settings for the building/space
      </Text>

      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Grid grow>
          <Item>
            {filteredTableData.map((formField) => (
              <FormFields disabled={!isSpaceAdmin} formField={formField} form={form} />
            ))}
          </Item>
        </Grid>

        <Group justify="right" mt="xl">
          <Button type="submit" disabled={!isSpaceAdmin} radius="xl">
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
