import { NotificationData } from "@mantine/notifications";
import { Icons } from "../icons/icons";
type ErrorArgs = {
  data?: any;
  ms?: number;
  id?: string;
};

export const ERROR_GENERAL = {
  // id: args.id,
  title: "Error",
  color: "red",
  icon: <Icons.alert />,
  message: "Something went wrong",
  autoClose: 2000,
};

export const LOADING_GENERAL = {
  id: "loading-general",
  title: "Loading",
  message: "Finishing operation...",
  color: "blue",
  loading: true,
};

export const SUCCESS_GENERAL = {
  title: "Success",
  message: "operation Success",
  color: "green",
  icon: <Icons.check stroke="green" />,
};

export const constructErrorNotificationData = (
  data?: any,
  ms: number = 1000,
  id: string = "error"
) => {
  return {
    id,
    title: "Error",
    color: "red",
    icon: <Icons.alert />,
    message: data || data?.message || "connection error",
    autoClose: ms,
  };
};

export const NOTIFICATIONS = {
  LOADING: {
    email: {
      ...LOADING_GENERAL,
      id: "email-submit",
      message: "Email sending...",
    },
    uploading: {
      ...LOADING_GENERAL,
      id: "uploading",
      title: "Loading",
      message: "Uploading...",
    },
    general: LOADING_GENERAL,
  },
  SUCCESS: {
    generic: SUCCESS_GENERAL,
    genericFn: (data: Partial<NotificationData>) => ({ ...SUCCESS_GENERAL, ...data }),
    email: {
      ...SUCCESS_GENERAL,
      title: "Success",
      message: "Email sent",
      color: "green",
    },
  },
  ERROR: {
    general: (
      args: ErrorArgs = {
        data: { message: "Something went wrong" },
        ms: 2000,
        id: "error",
      }
    ) => ({
      ...ERROR_GENERAL,
      ...args,
    }),
  },
};
