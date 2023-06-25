import { useContext } from 'react';
import { FilterContext } from '../src/context/FilterContext';

export const useFilter = () => {
  const context = useContext(FilterContext);
  if (!context) throw new Error('Filter context must be used inside FilterProvider');
  return context;
};
