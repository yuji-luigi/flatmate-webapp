import { Icons } from '../icons';

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
