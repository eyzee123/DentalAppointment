// src/store/dentistSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getDentists } from '../../service/dentistService';

export const fetchDentists = createAsyncThunk('dentists/fetchDentists', async (_, thunkAPI) => {
  try {
    return await getDentists();
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
  }
});

const dentistSlice = createSlice({
  name: 'dentists',
  initialState: {
    dentists: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDentists.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchDentists.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.dentists = action.payload;
      })
      .addCase(fetchDentists.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default dentistSlice.reducer;
