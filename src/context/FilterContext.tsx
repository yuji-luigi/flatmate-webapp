import { ChangeEvent, createContext, ReactNode, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { FilterContextType } from "../types/context/filter-context.";

export const FilterContext = createContext<FilterContextType>({
  selectFilters: [],
  setSelectFilters(_filters: { field: string; value: string }): void {},
  // setSelectFilters: function (
  //   filters: { entity: string; value: string | number | boolean | null | undefined }[]
  // ): void {},
  textFilter: "",
  setTextFilter(_text: string): void {},
  dateFilters: null,
  setDateFilters(_date: Date | null): void {},
  booleanFilters: [],
  setBooleanFilters(_filters: { field: string; value: boolean }[]): void {},
  filters: {
    selectFilters: [],
    textFilter: "",
    dateFilters: null,
    booleanFilters: [],
  },
});

export const useFilterStore = (): FilterContextType => {
  const router = useRouter();
  const [selectFilters, setSelectFilters] = useState<
    { field: string; value: string | number | boolean | null | undefined }[]
  >([]);
  const [textFilter, setTextFilter] = useState<string>("");
  const [dateFilters, setDateFilters] = useState<Date | null>(null);
  const [booleanFilters, setBooleanFilters] = useState<{ field: string; value: boolean }[]>([]);

  // genericly add select filters
  const handleSelectFilter = (newFilter: { field: string; value: string }) => {
    const { field } = newFilter;
    setSelectFilters((prev) => {
      const array = prev.filter((filter) => filter.field !== field);
      // check if filterd one is empty array
      if (!array.length) return [newFilter];
      // if not empty add to array
      return [...prev.filter((filter) => filter.field !== field), newFilter];
    });
  };

  const handleDateFilters = (_: { value: Date; inputName: string }) => {
    const { value, inputName } = _;
    setDateFilters((prev) => {
      if (prev instanceof Date) {
        // Your logic to change the date goes here
        // For example, let's add a day to the current date
        const newDate = new Date(prev);
        newDate.setDate(prev.getDate() + 1);
        return newDate;
      }
      return null;
    });
    // setDateFilters((prev) => {
    //   return newDate;
    //   const array = prev.filter((filter) => filter.inputName !== inputName);
    //   // check if filterd one is empty array
    //   if (!array.length) return [newDate];
    //   // if not empty add to array
    //   return [...prev.filter((filter) => filter.entity !== entity), newDate];
    // });
  };

  const handleTextFilter = (e: ChangeEvent<HTMLInputElement>) => {
    setTextFilter(e.target.value);
    // setPage(0);
  };
  const handleSetBooleanFilters = (data: { field: string; value: boolean }) => {
    if (!data) return setBooleanFilters([]);

    const existingFilterIndex = booleanFilters.findIndex((filter) => filter.field === data.field);

    if (existingFilterIndex !== -1) {
      // Update existing filter
      return setBooleanFilters((prev) => {
        const updatedFilters = [...prev];
        updatedFilters[existingFilterIndex] = data;
        return updatedFilters;
      });
    }
    // Add new filter
    return setBooleanFilters((prev) => [...prev, data]);
    // return setPage(0);
  };
  const resetFilters = () => {
    setSelectFilters([]);
    setTextFilter("");
    setDateFilters(null);
    setBooleanFilters([]);
  };
  useEffect(() => {
    resetFilters();
  }, [router]);
  return {
    booleanFilters,
    setBooleanFilters,
    dateFilters,
    setDateFilters,
    selectFilters,
    setSelectFilters: handleSelectFilter,
    textFilter,
    setTextFilter,
    filters: {
      selectFilters,
      textFilter,
      dateFilters,
      booleanFilters,
    },
  };
};

export const FilterContextProvider = ({ children }: { children: ReactNode }) => (
  <FilterContext.Provider value={useFilterStore()}>{children}</FilterContext.Provider>
);
