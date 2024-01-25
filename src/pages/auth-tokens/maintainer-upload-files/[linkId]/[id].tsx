import { useRouter } from 'next/router';
import { ReactElement, useEffect, useState } from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { PATH_API, _PATH_API } from '../../../../path/path-api';

import { PinVerifCardMCheck } from '../../../../sections/@nonce-check/m-file-upload/pin-verif/PinVerifCardMCheck';
import { CheckType } from '../../../../types/models/maintenance-check-type';
import { MaintenanceCheckUploadSection } from '../../../../sections/@nonce-check/m-file-upload/verified-m-file/MainteanceCheckUploadSection';
import Layout from '../../../../layouts';
import { useCookieContext } from '../../../../context/CookieContext';
import axiosInstance from '../../../../utils/axios-instance';
import { MaintainerCompleteRegisterCard } from '../../../../sections/@nonce-check/m-file-upload/maintainer-complete-register/MaintainerCompleteRegisterCard';

const MaintainerUploadFileAuthPage = () => {
  const { query } = useRouter();
  const [pinOk, setPinOk] = useState<boolean>(false); // todo: need to check if pin is ok or not
  const [checkType, setCheckType] = useState<CheckType | null>(null); // todo: need to check if pin is ok or not
  const { handleSetCurrentSpace } = useCookieContext();
  useEffect(() => {
    handleSetCurrentSpace();
  }, [pinOk]);

  return (
    <>
      {!pinOk && <PinVerifCardMCheck pinOk={pinOk} setPinOk={setPinOk} />}
      <MaintenanceCheckUploadSection
        pinOk={pinOk}
        checkType={checkType}
        setCheckType={setCheckType}
      />
    </>
  );
};

MaintainerUploadFileAuthPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout variant="auth-token" title="Upload maintenance invoice/receipt">
      {page}
    </Layout>
  );
};

export default MaintainerUploadFileAuthPage;

// export async function getStaticProps({ locale }: { locale: string }) {
//   return {
//     props: {
//       ...(await serverSideTranslations(locale, ['common', 'notification'], null, ['en', 'it'])),
//       // Will be passed to the page component as props
//     },
//   };
// }
