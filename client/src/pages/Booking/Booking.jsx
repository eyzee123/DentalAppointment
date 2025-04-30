import React, { useEffect, useState } from 'react';
import '../Booking/Booking.css';
import { Button } from '../../components/shared';
import { FaPaperPlane } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDentists } from '../../redux/slice/dentistSlice';
import { fetchDentistTimeSlot, resetTimeSlotState } from '../../redux/slice/timeslotSlice';
import { bookAppointment, resetBookingState } from '../../redux/slice/bookingSlice';
import { LOCAL_STORAGE_KEY } from '../../utils/constants/localStorage';
import { getDataObject } from '../../utils/helper/localstoage';
import { useNavigate } from 'react-router-dom';


const BookingPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { dentists, status, error } = useSelector((state) => state.dentists);
  const { timeslots } = useSelector((state) => state.timeslot);
  const { loading, success, errorBooking } = useSelector((state) => state.booking);

  const [selectedDentist, setSelectedDentist] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedSlot, setSelectedSlot] = useState('');
  const [confirmed, setConfirmed] = useState(false);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchDentists());
    }
  }, [dispatch, status]);

  const handleDentistChange = (e) => {
    setSelectedDentist(e.target.value);
    setSelectedSlot('');
    setConfirmed(false);
  };

  const handleDateChange = (e) => {
    const requestData = {
      dentistId: selectedDentist,
      appointmentDate: e.target.value
    }
    dispatch(fetchDentistTimeSlot(requestData));
    setSelectedDate(e.target.value);
    setSelectedSlot('');
    setConfirmed(false);
  };

  const handleSlotClick = (slot) => {
    setSelectedSlot(slot);
    setConfirmed(false);
  };

  const handleConfirm = async () => {
    if (selectedDentist && selectedDate && selectedSlot) {
      const user = getDataObject(LOCAL_STORAGE_KEY.user);

      const appointmentData = {
        dentistId: parseInt(selectedDentist),
        patientId: parseInt(user.id),
        timeslotId: parseInt(selectedSlot),
      };
      console.log("app",appointmentData);
      dispatch(bookAppointment(appointmentData));
      setConfirmed(true);
      dispatch(resetBookingState());
    }
  };

  if (status === 'loading') return <p>Loading...</p>;
  if (status === 'failed') return <p>Error: {error}</p>;

  return (
    <div className="booking-container">
      <h1>Book Your Appointment</h1>

      <div className="form-group">
        <label>Select Dentist:</label>
        <select value={selectedDentist} onChange={handleDentistChange}>
          <option value="">-- Choose a Dentist --</option>
          {dentists && dentists.map((dentist) => (
            <option key={dentist.id} value={dentist.id}>
              {dentist?.name}
            </option>
          ))}
        </select>
      </div>

      {selectedDentist && (
        <div className="form-group">
          <label>Select Date:</label>
          <input
            type="date"
            value={selectedDate}
            onChange={handleDateChange}
            min={new Date().toISOString().split('T')[0]} // Prevent selecting past dates
          />
        </div>
      )}

      {selectedDentist && selectedDate && (
        <div className="slots-section">
          <h3>Available Time Slots on {new Date(selectedDate).toDateString()}:</h3>
          <div className="slots-list">
            {timeslots && timeslots.map((slot, index) => (
              <button
                disabled={parseInt(slot.status) === 1}
                key={index}
                className={`slot-button ${selectedSlot === slot.id ? 'selected' : ''}`}
                onClick={() => handleSlotClick(slot.id)}
              >
                {slot?.slot_time}
              </button>
            ))}
          </div>
        </div>
      )}

      {selectedSlot && (
        <div className="confirm-button">
           <Button 
            text="Confirm Appointment" 
            icon={FaPaperPlane} 
            onClick={handleConfirm} 
            variant="secondary" 
          />
        </div>
      )}

      {loading && <p>Booking your appointment...</p>}
      {errorBooking && <p className="error-message">❌ {error}</p>}
      {success && (
        <p className="confirmation-message">
          ✅ Appointment confirmed with <strong>{dentists.find(d => d.id === parseInt(selectedDentist))?.name}</strong> on <strong>{new Date(selectedDate).toDateString()}</strong> at <strong>{timeslots.find(d => d.id === parseInt(selectedSlot))?.slot_time}</strong>
        </p>
      )}
    </div>
  );
};

export default BookingPage;
