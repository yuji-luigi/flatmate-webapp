import { Icons } from '../icons/icons';

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
      id: 'email-submit',
      title: 'Loading',
      message: 'Email sending...',
      color: 'blue',
      // autoClose: 700,
      loading: true,
    },
    uploading: {
      id: 'uploading',
      title: 'Loading',
      message: 'Uploading...',
      color: 'blue',
      // autoClose: 700,
      loading: true,
    },
    general: {
      id: 'loading-general',
      title: 'Loading',
      message: 'Finishing operation...',
      color: 'blue',
      // autoClose: 700,
      loading: true,
    },
  },
  SUCCESS: {
    generic: {
      title: 'Success',
      message: 'operation Success',
      color: 'green',
      icon: <Icons.check stroke="green" />,
    },
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
      message: data?.message || data || 'connection error',
      autoClose: ms,
    }),
  },
};
