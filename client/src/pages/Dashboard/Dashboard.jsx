import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchAppointments,
} from '../../redux/slice/bookingSlice';
import { getDataObject } from '../../utils/helper/localstoage';
import { LOCAL_STORAGE_KEY } from '../../utils/constants/localStorage';
import '../Dashboard/Dashboard.css';
import { formatDate, formatTime } from '../../utils/helper/dateTimeFormatter';

function Dashboard() {
    const dispatch = useDispatch();
    const { items, loading, error } = useSelector((state) => state.booking);
    console.log("app",items);
    const user = getDataObject(LOCAL_STORAGE_KEY.user);
    
    useEffect(() => {
        dispatch(fetchAppointments(user.id));
      }, [dispatch]);

    return (
        <div className="dashboard-container">
        <h2>My Appointments</h2>
  
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
            <button className="btn view">Reschedule</button>
            <button className="btn cancel">Cancel</button>
          </div>
        </div>
        ))}
        </div>
{/*   
        {rescheduleId && (
          <div className="reschedule-form">
            <h3>Reschedule Appointment</h3>
            <input
              type="date"
              value={newDate}
              onChange={(e) => setNewDate(e.target.value)}
            />
            <input
              type="time"
              value={newTime}
              onChange={(e) => setNewTime(e.target.value)}
            />
            <button onClick={handleReschedule}>Confirm</button>
            <button onClick={() => setRescheduleId(null)}>Cancel</button>
          </div>
        )} */}
      </div>
    );
  }
  
  export default Dashboard;