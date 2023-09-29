import React, { Fragment } from 'react';
import { useRouter } from 'next/router';
import formFields from '../../../../json/dataTable/formfields';
import { Sections } from '../../../types/general/data/sections-type';
import { FormFieldTypes } from '../../../types/general/data/data-table/formField-types';
import classes from './StaticTableHeader.module.css';

const StaticTableHeader = ({ json, actions }: { json: any[]; actions?: any }) => {
  const { query } = useRouter();

  json?.sort((a: FormFieldTypes, b: FormFieldTypes) => a.priority - b.priority);
  return (
    <thead>
      <tr>
        {json?.map((cellData: FormFieldTypes) => (
          <Fragment key={cellData.id}>
            {!cellData.noTable && <th className={classes.tableCellContent}>{cellData.label}</th>}
          </Fragment>
        ))}
        {actions && <th>actions</th>}
      </tr>
      <tr />
    </thead>
  );
};

export default StaticTableHeader;
