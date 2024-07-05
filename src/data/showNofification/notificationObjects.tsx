import { NotificationData } from "@mantine/notifications";
import { Icons } from "../icons/icons";
type ErrorArgs = {
  message?: any;
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
  // message: "Finishing operation...",
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

export const ERROR_NOTIFICATION = {
  title: "Error",
  color: "red",
  icon: <Icons.alert />,
  message: "connection error",
  autoClose: 5000,
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
    construct: constructErrorNotificationData,
    // TODO: DEPRECATE
    general: (
      args: ErrorArgs = {
        message: "Something went wrong, please try again or contact support",
        ms: 2000,
        id: "error",
      }
    ) => ({
      ...ERROR_GENERAL,
      ...args,
    }),
  },
};
