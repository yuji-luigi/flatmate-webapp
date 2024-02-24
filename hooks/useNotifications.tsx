import { NotificationData, NotificationsStore, showNotification } from '@mantine/notifications';
import { useLocale } from './useLocale';

type useNotificationsProps = { message: string; title: string };

export const useNotifications = () => {
  const { t } = useLocale('common');
  const notification = {
    show: (data: NotificationData, store: NotificationsStore) => {
      const message = typeof data.message === 'string' ? t(data.message) : data.message;
      const title = typeof data.title === 'string' ? t(data.title) : data.title;
      showNotification({ ...data, message, title }, store);
    },
  };

  return notification;
};
