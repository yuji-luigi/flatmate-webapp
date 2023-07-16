import { useRouter } from 'next/router';
import { PATH_API } from '../../../path/api-routes';
import { Container } from '@mantine/core';
import classes from './FileAuth.module.css';

import { useState } from 'react';
import { PinVerifCard } from '../../../sections/maintainer-upload-file-section/pin-verif/PinVerifCard';
import { InvoiceReceiptInput } from '../../../sections/maintainer-upload-file-section/invoice-receipt-input/InvoiceReceiptInput';

const MaintainerUploadFileAuthPage = () => {
  const { query, push } = useRouter();
  const [pinOk, setPinOk] = useState<boolean>(false); // todo: need to check if pin is ok or not
  const [submitting, setSubmitting] = useState<boolean>(false);

  const endpoint = `${PATH_API.maintenanceFileUpload}/${query.linkId}/${query.id}`;

  return (
    <Container className={classes.container}>
      {pinOk ? <InvoiceReceiptInput /> : <PinVerifCard setPinOk={setPinOk} />}
    </Container>
  );
};

export default MaintainerUploadFileAuthPage;
