import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  email: '',
  password: '',
  error: '',
  isLoading: false,
};

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setField: (state, action) => {
      state[action.payload.field] = action.payload.value;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    clearForm: (state) => {
      state.email = '';
      state.password = '';
      state.error = '';
    },
  },
});

export const { setField, setError, setLoading, clearForm } = loginSlice.actions;

export default loginSlice.reducer;
