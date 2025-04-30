import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  cancelAppointment,
  fetchAppointments,
} from '../../redux/slice/bookingSlice';
import { getDataObject } from '../../utils/helper/localstoage';
import { LOCAL_STORAGE_KEY } from '../../utils/constants/localStorage';
import '../Dashboard/Dashboard.css';
import { formatDate, formatTime } from '../../utils/helper/dateTimeFormatter';
import ConfirmDialog from '../../components/shared/confirm-dialog/ConfirmDialog';
import { useNavigate } from 'react-router-dom';
import { setPrefillData } from '../../redux/slice/bookingPrefillSlice';
import toast, { Toaster } from 'react-hot-toast';

function Dashboard() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [showDialog, setShowDialog] = useState(false);
    const [selectedBooking, setSelectedBooking] = useState(null);
    const { items, loading, error } = useSelector((state) => state.booking);
    const user = getDataObject(LOCAL_STORAGE_KEY.user);
    
    useEffect(() => {
        dispatch(fetchAppointments(user.id));
      }, [dispatch]);

      const handleCancelBooking = (appointment) => {
        setShowDialog(true);
        setSelectedBooking(appointment.id);
      };

      const handleEditBooking = (appointment) => {
        dispatch(setPrefillData({
          id: appointment.id,
          dentist: appointment.dentist,
          date: appointment.appointment_date,
          time: appointment.slot_time,
        }));
        navigate('/booking');
      };

      const handleConfirm = () => {
        setShowDialog(false);
        dispatch(cancelAppointment(selectedBooking)).unwrap()
        .then((res) => {
          toast.success(res.result.message);
          dispatch(fetchAppointments(user.id));
        })
        .catch((err) => {
          console.error("Failed to cancel appointment:", err);
        });
       
      };
    
      const handleCancel = () => {
        setShowDialog(false);
      };
    return (
      <>
        <Toaster position="top-right" />
        <div className="dashboard-container">
        <h2>My Appointments</h2>
          <ConfirmDialog
          show={showDialog}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
          message="Do you really want to cancel this appointment?"
        />
        {loading && <p>Loading...</p>}
        {error && <p>Error loading appointments</p>}
        <div className='appointment-container'>
        {items.map((appt) => (
          <div className="appointment-item" key={appt.id}>
          <div className="appointment-info">
            <h4>{ appt.dentist }</h4>
            <p><span>Date:</span> {formatDate(appt.appointment_date)} </p>
            <p><span>Time:</span> {formatTime(appt.slot_time)}</p>
          </div>
          <div className="appointment-actions">
            <button className="btn view" onClick={() => handleEditBooking(appt)}>Reschedule</button>
            <button className="btn cancel" onClick={() => handleCancelBooking(appt)}>Cancel</button>
          </div>
        </div>
        ))}
        </div>
      </div>
      </>
    );
  }
  
  export default Dashboard;