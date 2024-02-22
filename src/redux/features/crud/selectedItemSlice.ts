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
      if (typeof action.payload === 'function') {
        // Explicitly cast the payload as a function that takes the current state and returns the new state
        const updateFn = action.payload as (prevState: typeof state.item) => typeof state.item;
        const newState = updateFn(state.item);
        state.item = newState;
      } else {
        state.item = action.payload;
      }
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

  const setItem = (item: ItemType | ((prevState: ItemType) => ItemType)) => {
    // Check if item is a function and handle accordingly
    if (typeof item === 'function') {
      // First, retrieve the current state
      const currentState = get;
      // Then, dispatch the action with the new state calculated by the provided function
      const newState = (item as (prevState: ItemType) => ItemType)(currentState);
      appDispatch(set(newState));
    } else {
      appDispatch(set(item));
    }
  };
  return {
    /** Returns Array of Documents of the entity: whole array of entity */
    get: get || initialValues,
    set: setItem,
  };
};
