import { combineReducers } from '@reduxjs/toolkit';
import queryReducer from './querySlice';

const rootReducer = combineReducers({
  query: queryReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
