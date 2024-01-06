import { MantineStyleProp } from '@mantine/core';
import { CheckInterface, MaintenanceModel } from '../../models/maintenance-check-type';
import { ThreadModel } from '../../models/thread-model';

export type FeedCardData = (MaintenanceModel | ThreadModel) & {
  receipts?: CheckInterface[];
  invoices?: CheckInterface[];
  className?: string;
};

export type FeedCardProps = {
  popupFn?: () => void;
  data: FeedCardData;
  showFullText?: boolean;
  style?: MantineStyleProp;
};
