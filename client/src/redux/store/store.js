import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../slice/authSlice';
import loginReducer from '../slice/loginSlice';
import userReducer from '../slice/userSlice';
import dentistReducer from '../slice/dentistSlice';
import timeslotReducer from '../slice/timeslotSlice';
import bookingReducer from '../slice/bookingSlice';
import bookingPrefillReducer from '../slice/bookingPrefillSlice';




const store = configureStore({
  reducer: {
    auth: authReducer,
    login: loginReducer,
    user: userReducer,
    dentists: dentistReducer,
    timeslot: timeslotReducer,
    booking: bookingReducer,
    bookingPrefill: bookingPrefillReducer,
  },
});

export default store;