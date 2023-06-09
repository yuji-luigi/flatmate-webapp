import { useEffect } from 'react';
import { useCrudSelectors, useCrudSliceStore } from '../../src/redux/features/crud/crudSlice';
import { createLabelFromArrayStr } from '../../src/utils/helpers/helper-functions';
import { Sections } from '../../src/types/general/data/sections-type';
import {
  FormFieldInterface,
  FormFieldTypes,
  SelectFormType,
  SelectOption,
} from '../../src/types/general/data/data-table/formField-types';
import { SelectItem } from '@mantine/core';
// import { useCrudSlice } from '../redux-hooks/useCrudSlice';

export const useGetSelectOptions = (formField: SelectFormType): Array<SelectItem | string> | [] => {
  if (formField.type !== 'select') return [];
  // const options: Array<SelectOption> = [];
  // const [idleDocuments, setIdleDocuments] = useState<SelectOption[]>([]);
  /** fetch with query,  */
  const { fetchCrudDocumentsWithPagination } = useCrudSliceStore();
  const { crudDocuments } = useCrudSelectors(formField._entity as Sections);
  // const { fetchCrudDocumentsWithPagination, crudDocuments } = useCrudSlice(formField._entity);

  useEffect(() => {
    if (formField.type === 'select') {
      fetchCrudDocumentsWithPagination({
        entity: formField._entity!,
        queryObject: formField.query,
      });
    }
  }, [formField]);

  if (formField.type === 'select') {
    /** todo: to include infinite scrolling? */
    const options = crudDocuments.map((document) => {
      const label = createLabelFromArrayStr(formField.selectValues!, document);
      return { value: document._id, label };
    });
    return options;
  }

  // if (formField.type === 'static-select') {
  //   /** static-select type must have options Array<SelectOptions> */
  //   return formField.options!;
  // }
  return [];
};
