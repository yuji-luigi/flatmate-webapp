import React from 'react';
import { HeaderCreationModal } from './HeaderCreationModal';
import { SimpleDisclosureContextProvider } from '../../../context/SimpleDisclosureContext';

export const HeaderCreationModalWrapper = () => {
  return (
    <SimpleDisclosureContextProvider>
      <HeaderCreationModal />
    </SimpleDisclosureContextProvider>
  );
};
