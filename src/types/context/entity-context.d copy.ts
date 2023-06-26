import { Dispatch, SetStateAction } from 'react';
import { Sections } from '../general/data/sections-type';

interface StateVariable<T> {
  dateFilers: T;
  setDateFilters: Dispatch<SetStateAction<T>>;
}

export type FilterContextType = {
  selectFilters: Array<SelectFilterType>;
  setSelectFilters: (newFilter: { field: string; value: string }) => void;
  // setSelectFilters: (filters: Array<SelectFilterType>) => void;
  textFilter: string;
  setTextFilter: (text: string) => void;
  dateFilters: Date | null;
  setDateFilters: (date: Date | null) => void;
  // setDateFilters: Dispatch<SetStateAction<Date | null>>
  // setDateFilters: (prev: (date: Date) => Date) => void;
  booleanFilters: Array<BooleanFilterType>;
  setBooleanFilters: (filters: Array<BooleanFilterType>) => void;
  filters: Filters;
};

type SelectFilterType = { field: string; value: Primitives };
type Primitives = string | number | boolean | null | undefined;

type BooleanFilterType = { field: string; value: boolean };

export type Filters = {
  selectFilters: Array<SelectFilterType>;
  textFilter: string;
  dateFilters: Date | null;
  booleanFilters: Array<BooleanFilterType>;
};
