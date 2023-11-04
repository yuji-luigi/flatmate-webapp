import { useRouter } from 'next/router';
import { ReactElement, useState } from 'react';
import { PATH_API } from '../../../../path/path-api';

import { PinVerifCardMCheck } from '../../../../sections/@nonce-check/m-file-upload/pin-verif/PinVerifCardMCheck';
import { CheckType } from '../../../../types/models/maintenance-check-type';
import { MaintenanceCheckUploadSection } from '../../../../sections/@nonce-check/m-file-upload/verified-m-file/MainteanceCheckUploadSection';
import Layout from '../../../../layouts';

const MaintainerUploadFileAuthPage = () => {
  const { query } = useRouter();
  const [pinOk, setPinOk] = useState<boolean>(false); // todo: need to check if pin is ok or not
  const [checkType, setCheckType] = useState<CheckType | null>(null); // todo: need to check if pin is ok or not

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
