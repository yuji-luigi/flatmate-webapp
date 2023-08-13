import { Container, Transition } from '@mantine/core';
import React, { useState } from 'react';
import { ChooseTypeCard } from '../../../../sections/maintainer-upload-file-section/ChooseTypeCard';
import { CheckInputTabCard } from '../../../../sections/maintainer-upload-file-section/invoice-receipt-input/CheckInputTabCard';
import { PinVerifCard } from '../../../../sections/maintainer-upload-file-section/pin-verif/PinVerifCard';
import classes from '../../FileAuth.module.css';
import { CheckType } from '../../../../types/models/check-type';
import useSWR from 'swr';
import axiosInstance from '../../../../utils/axios-instance';
import { API_BASE_URL } from '../../../../path/api-routes';
import { GetServerSidePropsContext } from 'next';

const UserRegisterByTokenPage = () => {
  const [pinOk, setPinOk] = useState<boolean>(false); // todo: need to check if pin is ok or not
  const [checkType, setCheckType] = useState<CheckType | null>(null); // todo: need to check if pin is ok or not
  const [submitting, setSubmitting] = useState<boolean>(false);
  return (
    <Container className={classes.container}>
      {!checkType && (
        <Transition
          mounted={pinOk && !checkType}
          duration={800}
          transition="slide-up"
          timingFunction="ease-in-out"
        >
          {(styles) => (
            <div style={styles}>
              <ChooseTypeCard setCheckType={setCheckType} />
            </div>
          )}
        </Transition>
      )}
      <Transition
        mounted={pinOk && !!checkType}
        duration={800}
        transition="slide-up"
        timingFunction="ease-in-out"
      >
        {(styles) => (
          <div style={styles}>
            {checkType && <CheckInputTabCard setCheckType={setCheckType} checkType={checkType} />}
          </div>
        )}
      </Transition>

      {!pinOk && <PinVerifCard setPinOk={setPinOk} />}
    </Container>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  try {
    const { linkId, id } = context.query;
    const rawToken = await axiosInstance.get(`${API_BASE_URL}/auth-tokens/${linkId}/${id}`);

    if (!rawToken.data.data) {
      return {
        notFound: true,
      };
    }

    return {
      props: {}, // will be passed to the page component as props
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
}

export default UserRegisterByTokenPage;
