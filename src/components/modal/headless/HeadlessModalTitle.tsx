import { Stack } from "@mantine/core";
import { Icons } from "../../../data/icons/icons";
import { useLocale } from "../../../../hooks/useLocale";
import { ReactNode } from "react";

type HeadlessModalTitleProps = {
  title: string;
  subtitle?: string | null;
  /** size should be 60 */
  icon?: ReactNode;
};

/** translation needs to be happened before since several translation json exists. */
export const HeadlessModalTitle: React.FC<HeadlessModalTitleProps> = ({
  title,
  subtitle,
  icon,
}: HeadlessModalTitleProps) => {
  return (
    <Stack gap={4} justify="center" align="center">
      {icon && icon}
      <h2>{title}</h2>
      {subtitle && <h3>{subtitle}</h3>}
    </Stack>
  );
};
