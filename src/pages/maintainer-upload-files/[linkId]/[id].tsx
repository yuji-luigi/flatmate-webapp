import { useRouter } from 'next/router';
import { PATH_API } from '../../../path/api-routes';
import { Container, Transition } from '@mantine/core';
import classes from './FileAuth.module.css';

import { useState } from 'react';
import { PinVerifCard } from '../../../sections/maintainer-upload-file-section/pin-verif/PinVerifCard';
import { CheckInputTabCard } from '../../../sections/maintainer-upload-file-section/invoice-receipt-input/CheckInputTabCard';
import { ChooseTypeCard } from '../../../sections/maintainer-upload-file-section/ChooseTypeCard';
import { CheckType } from '../../../types/models/check-type';

const MaintainerUploadFileAuthPage = () => {
  const { query, push } = useRouter();
  const [pinOk, setPinOk] = useState<boolean>(false); // todo: need to check if pin is ok or not
  const [checkType, setCheckType] = useState<CheckType | null>(null); // todo: need to check if pin is ok or not
  const [submitting, setSubmitting] = useState<boolean>(false);

  const pinVerifEndPoint = `${PATH_API.maintenanceAuthFileUpload}/${query.linkId}/${query.id}`;

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

      {!pinOk && <PinVerifCard setPinOk={setPinOk} endpoint={pinVerifEndPoint} />}
    </Container>
  );
};

export default MaintainerUploadFileAuthPage;
