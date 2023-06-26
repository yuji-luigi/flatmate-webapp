import { Filters } from '../../../../types/context/entity-context.d copy';
import {
  FormFieldInterface,
  FormFieldTypes,
} from '../../../../types/general/data/data-table/formField-types';

type FilterListArgs = {
  list: any[];
  filters: Filters;
  formFields: FormFieldTypes[];
  comparator: (a: any, b: any) => number;
};
export function filterList({ list, filters, formFields, comparator }: FilterListArgs) {
  const { selectFilters, textFilter, dateFilters, booleanFilters } = filters;
  // corresponds to condition in CrudTableToolBar
  const selectSearchField = formFields.filter(
    (field) => field.type === 'select' && field.filterSearch
  );
  // const dateSearchField = formFields.filter(
  //   (field) => field.type === 'date-picker' && field.filterSearch
  // );
  const dateSearchField: FormFieldTypes[] = [];
  const textSearchField = formFields
    .filter((field) => field.textSearch !== false)
    .map((field) => field.name);

  const booleanSearchField = formFields.filter(
    (field) => field.type === 'checkbox-group' && field.filterSearch
  );
  const stabilizedThis = list.map((el, index) => [el, index]);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  list = stabilizedThis.map((el) => el[0]);

  /*
      Textfilter is inputText by user.
      textSearchField is array of field.name.(field.textSearch)
      Table data is fullRow
  */
  if (textFilter) {
    // This filter can be done by formfield formFields
    list = list.filter(
      (item) =>
        textSearchField.some(
          (name) => {
            if (!item) return false;
            const targetValue =
              typeof item[name] === 'object' ? item[name]?.name || '' : item[name] || '';
            return targetValue.toString().toLowerCase?.().includes(textFilter?.toLowerCase?.());
          }
          // flatWorksites?.join(", ").indexOf(textFilter.toLowerCase()) !== -1
        )
      // const flatWorksites = item[entity].map(obj => obj.name.toLowerCase()).flat();
    );
  }
  if (list.length === 0) return list;

  if (selectSearchField && selectFilters.length) {
    list = list.filter((item) =>
      selectFilters.every((filter) => {
        // filterSelect value is all then returns true. show all select of the entity
        if (!filter.value) return true;
        // if (filter.value === 'all') return true;
        let dataCompare = item[filter.field]?._id || item[filter.field] || [];
        // Metto nel array cosi filtro funziona anche data è un array
        dataCompare = !Array.isArray(dataCompare) ? [dataCompare] : dataCompare;
        dataCompare = dataCompare.map((data: any) => data._id || data);
        return dataCompare.some((data: any) => data === filter.value);
        // return   dataCompare === filter.value;
      })
    );
  }
  if (booleanSearchField && booleanFilters.length) {
    list = list.filter((item) => {
      return booleanFilters.every((booleanFilter) => {
        return item[booleanFilter.field] === booleanFilter.value;
      });
    });
  }
  if (dateSearchField /*  && selectFilters.length */) {
    /*
      for reference
       list = {
          name: 'some name',
          dateExpected: 22/3/2022,
       }

       dateFilter = [
          {
          inputName: dateExpected,
          value: 22/3/2022
       },
          {
          inputName: dateExecuted,
          value: 26/3/2022
       },
      ]

      formFields = [
          {
              name: dateExpected,
              searchCondition: 'same'
              type: date-picker
          }
          {
              name: dateExecuted,
              searchCondition: 'gt'
              type: date-picker
          }
      ]
       */
    //   list = list.filter((item) =>
    //     dateFilters.every((filter) => {
    //       // filterSelect value is all then returns true. show all select of the entity
    //       if (filter.value === 'all') return true;
    //       // check the same input name as dateFilter.inputName
    //       // same one needs to compare the value of the datepicker and list value,
    //       // check the condition of the value
    //       // if the value matches according to the condition given in the formFields(need to specify in the formFields ex: same, gt, lt)
    //       let dataCompare = item[filter.inputName];
    //       // Metto nel array cosi filtro funziona anche data è un array
    //       dataCompare = !Array.isArray(dataCompare) ? [dataCompare] : dataCompare;
    //       dataCompare = dataCompare.map((data) => data._id || data);
    //       return dataCompare.some((data) => data === filter.value);
    //       // return   dataCompare === filter.value;
    //     })
    //   );
  }

  return list;
}
