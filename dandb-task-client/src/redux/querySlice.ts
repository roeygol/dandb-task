
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface QueryState {
  history: string[];
  results: any[];
  currentQuery: string;
}

const initialState: QueryState = {
  history: [],
  results: [],
  currentQuery: '',
};

export const fetchHistory = createAsyncThunk<string[]>('query/fetchHistory', async () => {
  const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/history`);
  if (!response.ok) throw new Error('Failed to fetch history');
  return response.json();
});

export const fetchResults = createAsyncThunk<any[], string>('query/fetchResults', async (query) => {
  const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/search?q=${query}`);
  if (!response.ok) throw new Error('Failed to fetch results');
  return response.json();
});

const querySlice = createSlice({
  name: 'query',
  initialState,
  reducers: {
    setCurrentQuery: (state, action) => {
      state.currentQuery = action.payload;
    },
    addQuery: (state, action) => {
      state.history = [action.payload, ...state.history];
    },
    setResults: (state, action) => {
      state.results = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHistory.fulfilled, (state, action) => {
        state.history = action.payload;
      })
      .addCase(fetchResults.fulfilled, (state, action) => {
        state.results = action.payload;
      });
  },
});

export const { setCurrentQuery, addQuery, setResults } = querySlice.actions;
export default querySlice.reducer;
