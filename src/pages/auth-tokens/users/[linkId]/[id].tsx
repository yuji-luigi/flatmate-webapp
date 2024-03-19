import { Container, Transition } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import { CheckInputTabCard } from '../../../../sections/nonce-check/m-file-upload/verified-m-file/invoice-receipt-input/CheckInputTabCard';
import classes from '../../FileAuth.module.css';
import { CheckType } from '../../../../types/models/maintenance-check-type';

import { UserRegisterCard } from '../../../../sections/nonce-check/user-onboarding/UserRegisterCard';
import { PinVerifCardController } from '../../../../components/card/auth/PinVerifCardController';
import useAuth from '../../../../../hooks/useAuth';

const UserRegisterByTokenPage = () => {
  const { logout } = useAuth();
  const [pinOk, setPinOk] = useState<boolean>(false); // TODO: need to check if pin is ok or not
  const [checkType, setCheckType] = useState<CheckType | null>(null); // TODO: need to check if pin is ok or not

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
              <UserRegisterCard setCheckType={() => {}} />{' '}
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
