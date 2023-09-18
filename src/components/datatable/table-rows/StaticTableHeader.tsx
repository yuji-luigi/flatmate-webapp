import React, { Fragment } from 'react';
import { useRouter } from 'next/router';
import formFields from '../../../../json/dataTable/formfields';
import { Sections } from '../../../types/general/data/sections-type';
import { FormFieldTypes } from '../../../types/general/data/data-table/formField-types';

const StaticTableHeader = ({ json }: { json: any[] }) => {
  const { query } = useRouter();

  json?.sort((a: FormFieldTypes, b: FormFieldTypes) => a.priority - b.priority);
  return (
    <thead>
      <tr>
        {json?.map((cellData: FormFieldTypes) => (
          <Fragment key={cellData.id}>{!cellData.noTable && <th>{cellData.label}</th>}</Fragment>
        ))}
        <th>actions</th>
      </tr>
      <tr />
    </thead>
  );
};

export default StaticTableHeader;
