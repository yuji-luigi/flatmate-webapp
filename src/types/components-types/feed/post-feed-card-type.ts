import { MantineStyleProp, Sx } from '@mantine/core';
import { CheckInterface } from '../../models/maintenance-check-type';
import { MaintenanceModel } from '../../models/maintenance-model';
import { ThreadModel } from '../../models/thread-model';

export type FeedCardData = (MaintenanceModel | ThreadModel) & {
  receipts?: CheckInterface[];
  invoices?: CheckInterface[];
};

export type FeedCardProps = {
  popupFn?: () => void;
  data: FeedCardData;
  showFullText?: boolean;
  style?: MantineStyleProp;
};
