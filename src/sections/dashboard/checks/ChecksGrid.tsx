import React from 'react';
import { useTranslation } from 'next-i18next';
import { CheckInterface } from '../../../types/models/maintenance-check-type';
import { PreviewHandler } from '../../../components/files/preview/PreviewHandler';
import classes from './ChecksGrid.module.css';
import { intlDateFormat } from '../../../utils/helpers/date-formatters';

export function ChecksGrid({ checks }: { checks: CheckInterface[] }) {
  const { t } = useTranslation();
  return (
    <div className={classes.grid}>
      {checks.map((check, i) => (
        <div className={classes.receipts} key={check._id}>
          <div className={classes.receiptType}>
            {t(check.type)}
            {intlDateFormat(check.createdAt, 'it-IT')}
          </div>
          {check.files.map((file) => (
            <div key={file._id} className={classes.flex}>
              <PreviewHandler key={file._id} file={file} width={300} height={300} />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
