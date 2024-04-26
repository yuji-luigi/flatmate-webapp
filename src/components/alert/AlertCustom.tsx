import { Alert as AlertMantine, AlertProps } from "@mantine/core";
import { Icons } from "../../data/icons/icons";

type CustomAlertProps = {
  children: React.ReactNode;
  type?: "error" | "success" | "warning" | "info";
} & AlertProps;

export const AlertCustom: React.FC<CustomAlertProps> = ({
  children,
  title,
  variant,
  type,
  icon,
}: CustomAlertProps) => {
  const config = alertConfigs[type || "info"];
  const _icon = icon || config.icon;
  return (
    <AlertMantine title={title} icon={_icon} color={config.color} variant={variant}>
      {children}
    </AlertMantine>
  );
};

const alertConfigs = {
  error: {
    icon: <Icons.alert />,
    color: "red",
  },
  success: {
    icon: <Icons.check />,
    color: "green",
  },
  warning: {
    icon: <Icons.alert />,
    color: "yellow",
  },
  info: {
    icon: <Icons.info />,
    color: "blue",
  },
} as const;
