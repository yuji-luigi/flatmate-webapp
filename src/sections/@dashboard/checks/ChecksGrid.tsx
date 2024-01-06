import React from 'react';
import { CheckInterface } from '../../../types/models/maintenance-check-type';
import { PreviewHandler } from '../../../components/files/preview/PreviewHandler';
import classes from './ChecksGrid.module.css';

export function ChecksGrid({ checks }: { checks: CheckInterface[] }) {
  return (
    <div className={classes.grid}>
      {checks.map((check, i) => (
        <div className={classes.receipts} key={check._id}>
          <div className={classes.receiptType}>
            {check.type}
            {check.createdAt.toLocaleString()}
          </div>
          {check.files.map((file) => (
            <div key={file._id} className={classes.flex}>
              <PreviewHandler key={file._id} enableLink file={file} width={300} height={300} />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
