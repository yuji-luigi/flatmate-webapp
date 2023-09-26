import React from 'react';
import HeaderModalForm from './HeaderModalForm';
import PostModalForm from './PostModalForm';

const ModalContent = ({ modalType }: { modalType: 'threads' | 'maintenances' }) => {
  return (
    <>
      <HeaderModalForm entity={modalType} />
    </>
  );
};

export default ModalContent;
