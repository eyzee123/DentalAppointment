import { createSlice } from '@reduxjs/toolkit';

const signupSlice = createSlice({
  name: 'signup',
  initialState: {
    formData: {
      name: '',
      email: '',
      password: '',
      phone_number: '',
    },
    loading: false,
    error: '',
  },
  reducers: {
    setFormData: (state, action) => {
      state.formData = {
        ...state.formData,
        [action.payload.field]: action.payload.value,
      };
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearForm: (state) => {
      state.formData = {
        name: '',
        email: '',
        password: '',
        phone_number: '',
      };
    },
  },
});

export const { setFormData, setLoading, setError, clearForm } = signupSlice.actions;
export default signupSlice.reducer;
