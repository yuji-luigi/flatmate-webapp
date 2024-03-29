import { Icons } from "../icons/icons";

export const constructErrorNotificationData = (data: string, ms: number = 1000) => {
  return {
    title: "Error",
    color: "red",
    icon: <Icons.alert />,
    message: data || "connection error",
    autoClose: ms,
  };
};
