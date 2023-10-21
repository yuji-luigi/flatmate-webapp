import React, { Fragment } from 'react';
import { useRouter } from 'next/router';
import formFields from '../../../../json/dataTable/formfields';
import { Sections } from '../../../types/general/data/sections-type';
import {
  BaseFormType,
  FormFieldTypes,
} from '../../../types/general/data/data-table/formField-types';
import classes from './StaticTableHeader.module.css';

const getAlignmentDataAttribute = (alignment: 'left' | 'center' | 'right' = 'left') => {
  // Construct the data attribute based on the alignment value
  return { [`data-align-${alignment}`]: true };
};

const StaticTableHeader = ({ json, actions }: { json: FormFieldTypes[]; actions?: any }) => {
  const { query } = useRouter();

  json?.sort((a: FormFieldTypes, b: FormFieldTypes) => a?.priority || 0 - (b?.priority || 0));
  return (
    <thead>
      <tr>
        {json?.map((cellData) => {
          const dataAlign = getAlignmentDataAttribute(cellData.align);
          return (
            <Fragment key={cellData.id}>
              {!cellData.noTable && (
                <th {...dataAlign} className={classes.tableCellContent}>
                  {cellData.label}
                </th>
              )}
            </Fragment>
          );
        })}
        {actions && <th>actions</th>}
      </tr>
      <tr />
    </thead>
  );
};

export default StaticTableHeader;
