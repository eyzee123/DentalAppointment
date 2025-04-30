// src/store/bookingSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { addAppointment, cancelAppointments, getAppointments, updateAppointment } from '../../service/bookingService';

export const bookAppointment = createAsyncThunk(
  'booking/bookAppointment',
  async (appointmentData, { rejectWithValue }) => {
    try {
      return await addAppointment(appointmentData);
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Booking failed');
    }
  }
);

export const fetchAppointments = createAsyncThunk(
  'appointments/fetch',
  async (userId, { rejectWithValue }) => {
    try {
      return await getAppointments(userId);
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Retrieving appointments failed');
    }
  }
);

export const cancelAppointment = createAsyncThunk(
  'appointments/cancel',
  async (id, { rejectWithValue }) => {
    try {
      return await cancelAppointments(id);
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Cancel appointment failed');
    }
  }
);

export const rescheduleAppointment = createAsyncThunk(
  'booking/updateAppointment',
  async (appointmentData, { rejectWithValue }) => {
    try {
      return await updateAppointment(appointmentData);
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Update failed');
    }
  }
);


const bookingSlice = createSlice({
  name: 'booking',
  initialState: {
    loading: false,
    error: null,
    success: false,
    appointment: null,
    items: []
  },
  reducers: {
    resetBookingState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
      state.appointment = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(bookAppointment.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(bookAppointment.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.appointment = action.payload;
      })
      .addCase(bookAppointment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchAppointments.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAppointments.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.items = action.payload;
      })
      .addCase(cancelAppointment.fulfilled, (state, action) => {
        state.items = state.items.filter((appt) => appt.id !== action.payload);
      })
      .addCase(rescheduleAppointment.fulfilled, (state, action) => {
        state.items = state.items.filter((appt) => appt.id !== action.payload);
      })
  },
});

export const { resetBookingState } = bookingSlice.actions;
export default bookingSlice.reducer;
