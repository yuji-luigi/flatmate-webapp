import React, { ReactElement, useEffect } from 'react';
import { NextRouter, useRouter } from 'next/router';
import useSWR from 'swr';
import { AxiosError } from 'axios';
import axiosInstance from '../../utils/axios-instance';
import { PATH_API } from '../../path/path-api';
import Layout from '../../layouts';

import { PATH_CLIENT } from '../../path/path-frontend';
import useAuth from '../../../hooks/useAuth';
import { useCookieContext } from '../../context/CookieContext';
import { SpaceModel } from '../../types/models/space-model';
import { ParsedQueryCustom } from '../../types/nextjs-custom-types/useRouter-types';
import { ChooseSpaceSection } from '../../sections/@login_signup/choose-space/ChooseSpaceSection';

const fetchSpaces = async (organizationId: string) => {
  if (!organizationId) return null;
  const res = await axiosInstance.get(`${PATH_API.organizationCookie}/${organizationId}`);
  return res.data.data;
};

const ChooseSpaceInOrganizationPage = () => {
  const router: NextRouter & { query: ParsedQueryCustom; pathname: string } = useRouter();
  const { user } = useAuth();

  const { setCurrentOrganization } = useCookieContext();

  useEffect(() => {
    if (router.query.organizationId) {
      setCurrentOrganization(router.query.organizationId);
    }
  }, []);
  const { data: spaces } = useSWR<SpaceModel[] | null, AxiosError>(
    router.query.organizationId,
    fetchSpaces
  );
  const { data, error, isLoading } = useSWR<SpaceModel[] | null, AxiosError>(
    router.query.organizationId,
    fetchSpaces
  );
  const handleSpaceSelected = async (spaceId: string) => {
    await axiosInstance.get(`${PATH_API.spaceCookie}/${spaceId}`);
    router.push(PATH_CLIENT.root);
  };
  if (!spaces) return <p>loading...</p>;
  return <ChooseSpaceSection spaces={spaces} />;
  // return (
  //   <Box className={classes2.container}>
  //     <Box>
  //       <Button component={Link} href={PATH_CLIENT.chooseOrganization} variant="outline">
  //         Back
  //       </Button>
  //     </Box>
  //     <Text variant="text" size={36} weight={600} align="center">
  //       Choose a space
  //     </Text>
  //     <Box
  //       className={classes.pinContainer}
  //       py="xl" /* cols={2} breakpoints={[{ max-width: 'sm', cols: 1 }]} */
  //     >
  //       {spaces.map((rootSpace) => (
  //         <CardArticleVerticalTextBottom
  //           key={rootSpace._id}
  //           data={rootSpace as CardData}
  //           onClick={() => handleSpaceSelected(rootSpace._id)}
  //         />
  //       ))}
  //     </Box>
  //   </Box>
  // );
};

ChooseSpaceInOrganizationPage.getLayout = (page: ReactElement) => {
  return <Layout variant="main">{page}</Layout>;
};

export default ChooseSpaceInOrganizationPage;
