import React from "react";
type Props = {
  params: { linkId: string };
  searchParams: { [key: string]: string | string[] | undefined };
};
const EmailVerificationPage = ({ params, searchParams }: Props) => {
  return <div>EmailVerificationPage: insert nonce for {params.linkId} </div>;
};

export default EmailVerificationPage;
