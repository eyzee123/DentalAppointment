const pool = require('../config/db');
const TimeSlot = require('../models/TimeSlotModel');

const getTimeSlot = async (dentist_id,appointment_date) => {
  const query = `SELECT dentist_slots.*,(Select count(*) from appointments WHERE dentist_slots.id = appointments.timeslot_id AND status = 'booked') as status FROM dentist_slots where dentist_id= $1 AND appointment_date = $2;`;
  const { rows } = await pool.query(query,[dentist_id, appointment_date]);
  const timeSlot = rows.map(row => new TimeSlot(row));
  return timeSlot;
};


module.exports = {
    getTimeSlot,
};