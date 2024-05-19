import { Badge, Group, Stack } from "@mantine/core";
import { useLocale } from "../../../../../../hooks/useLocale";
import { Text } from "@mantine/core";

type PropertyManagerMaintenanceTabPanelProps = {};

export const PropertyManagerMaintenanceTabPanel: React.FC<
  PropertyManagerMaintenanceTabPanelProps
> = (props: PropertyManagerMaintenanceTabPanelProps) => {
  const { t } = useLocale();
  return (
    <Stack>
      <h2>
        {t("You have")}3 {t("maintenances reported this month")}
      </h2>
      <section>
        <Stack>
          <Group>
            <Badge>Contardo</Badge>
            <Badge>Luigi Mansion</Badge>
            <Badge>Apartment X</Badge>
            <Badge>Mansion L</Badge>
            <Badge>Contardo</Badge>
            <Badge>Luigi Mansion</Badge>
            <Badge>Apartment X</Badge>
            <Badge>Mansion L</Badge>
            <Badge>Contardo</Badge>
            <Badge>Luigi Mansion</Badge>
            <Badge>Apartment X</Badge>
            <Badge>Mansion L</Badge>
          </Group>
        </Stack>
      </section>
    </Stack>
  );
};
