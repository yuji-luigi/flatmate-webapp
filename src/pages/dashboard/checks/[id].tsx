import React, { ReactElement } from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import Link from 'next/link';
import { AxiosError } from 'axios';
import { UseRouterWithCustomQuery } from '../../../types/nextjs-custom-types/useRouter-types';
import { Sections } from '../../../types/general/data/sections-type';
import Layout from '../../../layouts';
import axiosInstance, { AxiosResDataGeneric } from '../../../utils/axios-instance';
import { PATH_API, _PATH_API } from '../../../path/path-api';
import { CheckInterface } from '../../../types/models/check-type';
import { MaintainerModel } from '../../../types/models/maintainer-model';

const fileFetcher = async (entity?: string, id?: string) => {
  if (!id) return null;
  try {
    const rawCheck = await axiosInstance.get<AxiosResDataGeneric<CheckInterface>>(
      `${PATH_API.checks}/${id}`
    );
    return rawCheck.data.data;
  } catch (error: any) {
    throw error.message;
  }
};
const ChecksByEntityPage = () => {
  const { query }: UseRouterWithCustomQuery = useRouter();
  const { entity, id } = query;
  const keyString = `/${entity}/${id}`;
  const { data, error } = useSWR<CheckInterface | null, AxiosError>(['checks', entity, id], () =>
    fileFetcher(entity, id)
  );
  if (!data) return null;
  return (
    <div>
      <div key={data._id}>
        {data.files.map((file) => (
          <Link key={file._id} href={file.url}>
            {' '}
            download{' '}
          </Link>
        ))}
      </div>
    </div>
  );
};

ChecksByEntityPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout variant="dashboard">{page}</Layout>;
};

export default ChecksByEntityPage;
