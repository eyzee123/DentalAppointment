const pool = require('../config/db');

const createAppointment = async (dentistId, patientId, timeslotId) => {
    const query = `
      INSERT INTO appointments (dentist_id, patient_id, timeslot_id)
      VALUES ($1, $2, $3)
      RETURNING dentist_id, patient_id, timeslot_id, created_at;
    `;
    const values = [dentistId, patientId, timeslotId];
  
    const { rows } = await pool.query(query, values);
    return rows[0];
  };

  const getAppointment = async (patientId) => {
    // const query = `SELECT * FROM appointments WHERE patient_id=$1;`;
    const query = `SELECT app.id, dentist.name as dentist, timeslot.appointment_date, timeslot.slot_time, app.status, app.created_at 
    FROM appointments app
    INNER JOIN dentists dentist ON app.dentist_id = dentist.id
    INNER JOIN dentist_slots timeslot ON app.timeslot_id = timeslot.id
    WHERE app.patient_id=$1;`;
    const values = [patientId];
    const { rows } = await pool.query(query,values);
    // const appointments = rows.map(row => new Dentist(row));
    return rows;
  };
  
  module.exports = {
    createAppointment,
    getAppointment,
  };
  