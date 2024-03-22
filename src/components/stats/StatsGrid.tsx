import { Group, Paper, SimpleGrid, Text, Box } from "@mantine/core";
import {
  IconDiscount2,
  IconCoin,
  IconArrowUpRight,
  IconArrowDownRight,
  TablerIconsProps,
} from "@tabler/icons-react";
import { useTranslation } from "next-i18next";
import { Icons } from "../../data/icons/icons";
import classesM from "./StatsGrid.module.css";
import { useLocale } from "../../../hooks/useLocale";

const _icons = {
  // user: IconUserPlus,
  discount: IconDiscount2,
  // receipt: IconReceipt2,
  coin: IconCoin,
  ...Icons,
} as const;

type IconIndex = keyof typeof _icons;

export type StatGridSchema = {
  title: string;
  value: number;
  iconColor?: string;
  icon?: IconIndex | ((props: TablerIconsProps) => JSX.Element);
  diff?: number;
  unit?: string;
  description?: string;
};

export function StatsGrid({ data }: { data: StatGridSchema[] }) {
  const { t } = useLocale("common");
  const A = data as unknown;
  const stats = (A as Array<StatGridSchema>).map((stat) => {
    const Icon = typeof stat.icon === "string" ? _icons[stat.icon] : stat.icon;
    const DiffIcon = stat.diff && stat.diff > 0 ? IconArrowUpRight : IconArrowDownRight;
    return (
      <Box key={stat.title} className={classesM.card}>
        <Paper className={classesM.paper} withBorder p="md" radius="md" key={stat.title}>
          <Group justify="apart">
            <Text size="xs" color="dimmed" className={classesM.title}>
              {t(stat.title)}
            </Text>
            {Icon && (
              <Icon data-color={stat.iconColor} className={classesM.icon} size={22} stroke={1.5} />
            )}
          </Group>

          <Group align="flex-end" gap="xs" mt={0}>
            <Text className={classesM.value}>
              {t(stat.unit || "")}
              {stat.value}
            </Text>
            {stat.diff && (
              <Text
                color={stat.diff > 0 ? "teal" : "red"}
                size="sm"
                fw={500}
                className={classesM.diff}
              >
                <span>{stat.diff}%</span>
                <DiffIcon size={16} stroke={1.5} />
              </Text>
            )}
          </Group>

          <Text size="xs" color="dimmed" mt={7}>
            {t(stat.description || "")}
          </Text>
        </Paper>
      </Box>
    );
  });
  return (
    <SimpleGrid
      cols={{
        sm: 1,
        md: 2,
      }}
      style={{ width: "100%" }}
      className={classesM.container}
      //   breakpoints={[
      //     { maxWidth: 'md', cols: 2 },
      //     { maxWidth: 'sm', cols: 1 },
      //   ]}
    >
      {stats}
    </SimpleGrid>
  );
  // return <Group className={classesM.container}>{stats}</Group>;
}
