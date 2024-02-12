import { createSlice } from '@reduxjs/toolkit';
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux-hooks/useRedux';
/* eslint-disable no-param-reassign */

type ItemSliceState = {
  item: null | any;
};

const initialState: ItemSliceState = {
  item: null,
};

//TODO: ONDELETE GET REQUEST/ SOME UPDATE REDUX STORE LOGIC IN BACKEND OR IN FRONTEND

export const itemSlice = createSlice({
  name: 'item',
  initialState,
  reducers: {
    set: (state, action) => {
      state.item = action.payload;
    },
  },
});

export const { set } = itemSlice.actions;

export default itemSlice.reducer;

/** Returns Array of Documents of the entity: whole array of entity */
const useItem = <ItemType>(): ItemType => useAppSelector((state) => state.item.item);

export const useItemSlice = <ItemType>(initialValues?: ItemType) => {
  const appDispatch = useAppDispatch();
  const get = useItem<ItemType>();
  return {
    /** Returns Array of Documents of the entity: whole array of entity */
    get: get || initialValues,
    set: (item: ItemType) => appDispatch(set(item)),
  };
};
