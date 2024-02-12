import { configureStore } from '@reduxjs/toolkit';
import crudReducer from './features/crud/crudSlice';
import selectedItemReducer from './features/crud/selectedItemSlice';
// import { rootReducer } from './rootReducer';
// import { useDispatch, useSelector } from 'react-redux';

export const store = configureStore({
  // reducer: rootReducer,
  reducer: {
    crud: crudReducer,
    item: selectedItemReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const appDispatch = store.dispatch;
export default store;
