import React, { Fragment } from 'react';
import { useRouter } from 'next/router';
import { Table } from '@mantine/core';
import formFields from '../../../../json/dataTable/formfields';
import { Sections } from '../../../types/general/data/sections-type';
import {
  BaseFormType,
  FormFieldTypes,
} from '../../../types/general/data/data-table/formField-types';
import classes from './StaticTableHeader.module.css';
import { getAlignmentDataAttribute } from '../../../utils/data-table/getAlignmentDataAttribute';

const StaticTableHeader = ({ json, actions }: { json: FormFieldTypes[]; actions?: any }) => {
  const { query } = useRouter();

  json?.sort((a: FormFieldTypes, b: FormFieldTypes) => a?.priority || 0 - (b?.priority || 0));
  return (
    <Table.Thead>
      <Table.Tr>
        {json?.map((cellData) => {
          const dataAlign = getAlignmentDataAttribute(cellData.align);
          return (
            <Fragment key={cellData.id}>
              {!cellData.noTable && (
                <Table.Th {...dataAlign} className={classes.tableCellContent}>
                  {cellData.label}
                </Table.Th>
              )}
            </Fragment>
          );
        })}
        {actions && <Table.Th>actions</Table.Th>}
      </Table.Tr>
    </Table.Thead>
  );
};

export default StaticTableHeader;
