import React, { Fragment } from 'react';
import { useRouter } from 'next/router';
import { Table } from '@mantine/core';
import formFields from '../../../../json/dataTable/formfields';
import { Sections } from '../../../types/general/data/sections-type';
import { FormFieldTypes } from '../../../types/general/data/data-table/formField-types';
import { getAlignmentDataAttribute } from '../../../utils/data-table/getAlignmentDataAttribute';
import classes from './StaticTableHeader.module.css';

const CrudTableHeader = ({ overridingEntity }: { overridingEntity: Sections }) => {
  const { query } = useRouter();

  const json = formFields[overridingEntity || (query.entity as Sections)];
  json?.sort((a: FormFieldTypes, b: FormFieldTypes) => a.priority || 0 - (b.priority || 0));
  return (
    <Table.Thead>
      <Table.Tr>
        {json?.map((cellData: FormFieldTypes) => {
          const dataAlign = getAlignmentDataAttribute(cellData.align);
          const cellStyle = cellData.cellConfig?.style || {};
          return (
            <Fragment key={cellData.id}>
              {!cellData.noTable && (
                <Table.Th style={cellStyle} className={classes.tableCellContent}>
                  {cellData.label}
                </Table.Th>
              )}
            </Fragment>
          );
        })}
        <th>actions</th>
      </Table.Tr>
    </Table.Thead>
  );
};

export default CrudTableHeader;
