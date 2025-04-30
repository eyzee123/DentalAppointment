import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../slice/authSlice';
import loginReducer from '../slice/loginSlice';
import signupReducer from '../slice/signupSlice';
import dentistReducer from '../slice/dentistSlice';
import timeslotReducer from '../slice/timeslotSlice';
import bookingReducer from '../slice/bookingSlice';
import bookingPrefillReducer from '../slice/bookingPrefillSlice';




const store = configureStore({
  reducer: {
    auth: authReducer,
    login: loginReducer,
    signup: signupReducer,
    dentists: dentistReducer,
    timeslot: timeslotReducer,
    booking: bookingReducer,
    bookingPrefill: bookingPrefillReducer,
  },
});

export default store;