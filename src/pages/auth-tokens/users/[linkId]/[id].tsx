import { Container, Transition } from '@mantine/core';
import React, { use, useEffect, useState } from 'react';
import { ChooseTypeCard } from '../../../../sections/maintainer-upload-file-section/ChooseTypeCard';
import { CheckInputTabCard } from '../../../../sections/maintainer-upload-file-section/invoice-receipt-input/CheckInputTabCard';
import { PinVerifCardMCheck } from '../../../../sections/maintainer-upload-file-section/pin-verif/PinVerifCardMCheck';
import classes from '../../FileAuth.module.css';
import { CheckType } from '../../../../types/models/check-type';
import useSWR from 'swr';
import axiosInstance from '../../../../utils/axios-instance';
import { API_BASE_URL, _PATH_API } from '../../../../path/path-api';
import { GetServerSidePropsContext } from 'next';
import { HiddenAuthTokenInterface } from '../../../../types/models/auth-token-model';
import { UserRegisterCard } from '../../../../sections/auth-tokens-user-register/UserRegisterCard';
import { PinVerifCardController } from '../../../../components/card/auth/PinVerifCardController';
import useAuth from '../../../../../hooks/useAuth';

const UserRegisterByTokenPage = () => {
  const { logout } = useAuth();
  const [pinOk, setPinOk] = useState<boolean>(false); // todo: need to check if pin is ok or not
  const [checkType, setCheckType] = useState<CheckType | null>(null); // todo: need to check if pin is ok or not
  const [submitting, setSubmitting] = useState<boolean>(false);

  useEffect(() => {
    logout();
  }, []);
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
              {' '}
              <UserRegisterCard
                setCheckType={function (type: 'invoices' | 'receipts' | null): void {
                  throw new Error('Function not implemented.');
                }}
              />{' '}
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
      {!pinOk && <PinVerifCardController setPinOk={setPinOk} />}
    </Container>
  );
};

export default UserRegisterByTokenPage;
