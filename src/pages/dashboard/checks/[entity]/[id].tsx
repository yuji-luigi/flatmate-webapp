import React from 'react';
import { UseRouterWithCustomQuery } from '../../../../types/nextjs-custom-types/useRouter-types';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { Sections } from '../../../../types/general/data/sections-type';

const getChecksByEntity = async (entity?: Sections, id?: string) => {
  const res = await fetch(`http://localhost:5000/api/v1/checks/${entity}/${id}`);
  return res.json();
};
const ChecksByEntityPage = () => {
  const { query }: UseRouterWithCustomQuery = useRouter();
  const { entity, id } = query;
  const keyString = `/${entity}/${id}`;
  const { data, error } = useSWR(['checks', entity, id], () => getChecksByEntity(entity, id));
  return (
    <div>
      {entity}
      {id}
    </div>
  );
};

export default ChecksByEntityPage;
