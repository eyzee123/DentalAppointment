// src/store/dentistSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getDentistTimeSlot } from '../../service/dentistService';

export const fetchDentistTimeSlot = createAsyncThunk('dentists/fetchDentistTimeslot', async (requestData, thunkAPI) => {
    try {
    return await getDentistTimeSlot(requestData);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
  }
});

const timeSlotSlice = createSlice({
  name: 'timeslot',
  initialState: {
    timeslots: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {
    resetTimeSlotState: (state) => {
        state.timeslots= [];
        state.status= 'idle'; // 'idle' | 'loading' | 'succeeded' | 'failed'
        state.error= null;
      },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDentistTimeSlot.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchDentistTimeSlot.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.timeslots = action.payload;
      })
      .addCase(fetchDentistTimeSlot.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { resetTimeSlotState } = timeSlotSlice.actions;
export default timeSlotSlice.reducer;
