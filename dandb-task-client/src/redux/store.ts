import { configureStore } from '@reduxjs/toolkit';
import queryReducer from './querySlice';

const store = configureStore({
  reducer: {
    query: queryReducer,
  },
});

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;

export default store;
