import React, { Fragment } from 'react';
import { useRouter } from 'next/router';
import formFields from '../../../../json/dataTable/formfields';
import { Sections } from '../../../types/general/data/sections-type';
import { FormFieldTypes } from '../../../types/general/data/data-table/formField-types';

const CrudTableHeader = ({ overridingEntity }: { overridingEntity: Sections }) => {
  const { query } = useRouter();

  const json = formFields[overridingEntity || (query.entity as Sections)];
  json?.sort((a: FormFieldTypes, b: FormFieldTypes) => a.priority || 0 - (b.priority || 0));
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

export default CrudTableHeader;
