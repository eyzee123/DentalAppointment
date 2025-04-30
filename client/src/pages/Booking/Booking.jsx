import React, { useEffect, useState } from 'react';
import '../Booking/Booking.css';
import { Button } from '../../components/shared';
import { FaPaperPlane } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDentists } from '../../redux/slice/dentistSlice';
import { fetchDentistTimeSlot, resetTimeSlotState } from '../../redux/slice/timeslotSlice';
import { bookAppointment, rescheduleAppointment, resetBookingState } from '../../redux/slice/bookingSlice';
import { LOCAL_STORAGE_KEY } from '../../utils/constants/localStorage';
import { getDataObject } from '../../utils/helper/localstoage';
import { useFetcher, useNavigate } from 'react-router-dom';
import { formatDateToPicker } from '../../utils/helper/dateTimeFormatter';
import { resetPrefillData } from '../../redux/slice/bookingPrefillSlice';
import toast, { Toaster } from 'react-hot-toast';

const BookingPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { dentists, status, error } = useSelector((state) => state.dentists);
  const { timeslots, status: timeSlotStatus } = useSelector((state) => state.timeslot);
  const { loading, success, errorBooking } = useSelector((state) => state.booking);
  const { id: bookingId, dentist, date, time } = useSelector((state) => state.bookingPrefill);

  const [selectedDentist, setSelectedDentist] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedSlot, setSelectedSlot] = useState('');
  const [confirmed, setConfirmed] = useState(false);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchDentists());
    }
   
  }, [dispatch, status]);

  useEffect(() => {
    if(dentists && dentists.length > 0){
      if(dentist && date && time){
        const selectedDentist = dentists.find(d=> d.name === dentist)?.id;
        const selectedDate = formatDateToPicker(date);
        setSelectedDentist(selectedDentist);
        setSelectedDate(selectedDate);

        const requestData = {
          dentistId: selectedDentist,
          appointmentDate: selectedDate
        }
        dispatch(fetchDentistTimeSlot(requestData));

      }
  }
  },[dispatch,dentists,dentist,date,time])

  useEffect(() => {
    if (timeslots && timeslots.length > 0) {
      if(dentist && date && time){
        const selectedTime = timeslots.find(t => t.slot_time === time)?.id;
        setSelectedSlot(selectedTime);
      }
    }
  }, [timeslots]);

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
      if(dentist && date && time){
        appointmentData.id = bookingId;
        dispatch(rescheduleAppointment(appointmentData)).unwrap()
        .then((res) => {
          toast.success(res.result.message);
        })
        .catch((err) => {
          console.error("Failed to cancel appointment:", err);
        });
        dispatch(resetPrefillData());
        navigate('/dashboard');
      } else {
        dispatch(bookAppointment(appointmentData)).unwrap()
        .then((res) => {
          toast.success(res.result.message);
        })
        .catch((err) => {
          console.error("Failed to book appointment:", err);
        });
        navigate('/dashboard');
      }
      setConfirmed(true);
      dispatch(resetBookingState());
    }
  };

  if (status === 'loading') return <p>Loading...</p>;
  if (status === 'failed') return <p>Error: {error}</p>;

  return (
    <>  
    <Toaster position="top-right" />
    <div className="booking-container">
      <h1>Book Your Appointment</h1>

      <div className="form-group">
        <label>Select Dentist: </label>
        <select disabled={dentist} value={selectedDentist} onChange={handleDentistChange}>
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
                disabled={parseInt(slot.status) === 1 && !time}
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
      {(confirmed && success) && (
        <p className="confirmation-message">
          ✅ Appointment confirmed with <strong>{dentists.find(d => d.id === parseInt(selectedDentist))?.name}</strong> on <strong>{new Date(selectedDate).toDateString()}</strong> at <strong>{timeslots.find(d => d.id === parseInt(selectedSlot))?.slot_time}</strong>
        </p>
      )}
    </div>
    </>
  );
};

export default BookingPage;
