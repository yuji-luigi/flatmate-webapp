import { useRouter } from 'next/router';
import { PATH_API } from '../../../../path/path-api';
import { Container, Title, Transition } from '@mantine/core';

import { ReactElement, useState } from 'react';
import { PinVerifCardMCheck } from '../../../../sections/maintainer-upload-file-section/pin-verif/PinVerifCardMCheck';
import { CheckInputTabCard } from '../../../../sections/maintainer-upload-file-section/verified-m-file/invoice-receipt-input/CheckInputTabCard';
import { ChooseTypeCard } from '../../../../sections/maintainer-upload-file-section/verified-m-file/ChooseTypeCard';
import { CheckType } from '../../../../types/models/check-type';
import { MaintenanceCheckUploadSection } from '../../../../sections/maintainer-upload-file-section/verified-m-file/MainteanceCheckUploadSection';
import Layout from '../../../../layouts';

const MaintainerUploadFileAuthPage = () => {
  const { query, push } = useRouter();
  const [pinOk, setPinOk] = useState<boolean>(false); // todo: need to check if pin is ok or not
  const [checkType, setCheckType] = useState<CheckType | null>(null); // todo: need to check if pin is ok or not
  const [submitting, setSubmitting] = useState<boolean>(false);

  const pinVerifEndpoint = `${PATH_API.maintenanceFileUpload}/${query.linkId}/${query.id}`;
  return (
    <>
      {!pinOk && <PinVerifCardMCheck setPinOk={setPinOk} endpoint={pinVerifEndpoint} />}
      <MaintenanceCheckUploadSection
        pinOk={pinOk}
        checkType={checkType}
        setCheckType={setCheckType}
      />
    </>
  );
};

MaintainerUploadFileAuthPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout variant="main">{page}</Layout>;
};

export default MaintainerUploadFileAuthPage;
