import { Icons } from '../icons';
type ErrorArgs = {
  data?: any;
  ms?: number;
  id?: string;
};
export const constructErrorNotificationData = (
  data?: any,
  ms: number = 1000,
  id: string = 'error'
) => {
  return {
    id,
    title: 'Error',
    color: 'red',
    icon: <Icons.alert />,
    message: data || data?.message || 'connection error',
    autoClose: ms,
  };
};

export const NOTIFICATIONS = {
  LOADING: {
    email: {
      title: 'Loading',
      message: 'Email sending...',
      color: 'blue',
      loading: true,
    },
  },
  SUCCESS: {
    email: {
      title: 'Success',
      message: 'Email sent',
      color: 'green',
    },
  },
  ERROR: {
    general: ({ data, ms = 1000, id = 'error' }: ErrorArgs) => ({
      id,
      title: 'Error',
      color: 'red',
      icon: <Icons.alert />,
      message: data || data?.message || 'connection error',
      autoClose: ms,
    }),
  },
};
