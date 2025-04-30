import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  id: null,
  dentist: '',
  date: '',
  time: '',
};

const bookingPrefillSlice = createSlice({
  name: 'bookingPrefill',
  initialState,
  reducers: {
    setPrefillData: (state, action) => {
      const { id, dentist, date, time } = action.payload;
      state.id = id;
      state.dentist = dentist;
      state.date = date;
      state.time = time;
    },
    resetPrefillData: () => initialState,
  },
});

export const { setPrefillData, resetPrefillData } = bookingPrefillSlice.actions;
export default bookingPrefillSlice.reducer;
