import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { editUser } from '../../service/userService';

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (formData, { rejectWithValue }) => {
    console.log("formDat1",formData);
    try {
      return await editUser(formData);
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Update failed');
    }
  }
);


const userSlice = createSlice({
  name: 'user',
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
    extraReducers: (builder) => {
      builder
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.formData = { ...state.formData, ...action.payload };
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    },
});

export const { setFormData, setLoading, setError, clearForm } = userSlice.actions;
export default userSlice.reducer;
