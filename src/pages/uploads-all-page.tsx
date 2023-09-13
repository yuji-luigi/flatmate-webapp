import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import axiosInstance, { AxiosResDataGeneric } from '../utils/axios-instance';
import { _PATH_API } from '../path/path-api';
import { UploadModel } from '../types/models/upload-model';

const AllUploadPage = () => {
  const { user } = useAuth();
  const [src, setSrc] = useState<string[]>([]);
  useEffect(() => {
    if (user?.role === 'super_admin') {
      const fetchAllUploads = async () => {
        const res = await axiosInstance.get<AxiosResDataGeneric<UploadModel[]>>(
          _PATH_API.uploads.all
        );
        const data = res.data.data;

        setSrc(data.map((item) => item.url));
      };
      fetchAllUploads();
    }
  }, [user?._id]);
  if (user?.role !== 'super_admin') return null;
  return (
    <>
      {src.map((img) => (
        <Image
          src={img}
          style={{
            objectFit: 'cover',
          }}
          width={500}
          height={400}
          alt=""
        />
      ))}
    </>
  );
};

export default AllUploadPage;
