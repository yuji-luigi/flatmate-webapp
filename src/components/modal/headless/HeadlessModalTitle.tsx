import { Stack } from "@mantine/core";
import { Icons } from "../../../data/icons/icons";
import { useLocale } from "../../../../hooks/useLocale";

type HeadlessModalTitleProps = {
  title: string;
  subtitle?: string | null;
};

export const HeadlessModalTitle: React.FC<HeadlessModalTitleProps> = ({
  title,
  subtitle,
}: HeadlessModalTitleProps) => {
  const { t } = useLocale();

  return (
    <Stack gap={4} justify="center" align="center">
      <Icons.propertyManagerBuilding size={60} />
      <h2>{t(title)}</h2>
      {subtitle && <h3>{t(subtitle)}</h3>}
    </Stack>
  );
};
