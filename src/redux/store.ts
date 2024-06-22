import { configureStore } from "@reduxjs/toolkit";
import crudReducer from "./features/crud/crudSlice";
import selectedItemReducer from "./features/crud/selectedItemSlice";
import spaceSelectionSlice from "./features/crud/spaceSelectionSlice";
// import { rootReducer } from './rootReducer';
// import { useDispatch, useSelector } from 'react-redux';

export const reduxStore = configureStore({
  // reducer: rootReducer,
  reducer: {
    crud: crudReducer,
    item: selectedItemReducer,
    spaceSelection: spaceSelectionSlice,
  },
});

export type RootState = ReturnType<typeof reduxStore.getState>;
export type AppDispatch = typeof reduxStore.dispatch;
export const appDispatch = reduxStore.dispatch;
export default reduxStore;
