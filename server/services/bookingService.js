const bookingRepository = require('../repositories/bookingRepository');


const addBooking = async (dentistId, patientId, timeslotId) => {
  const appointment = await bookingRepository.createAppointment(dentistId, patientId, timeslotId);
  return appointment;
};

const getBooking = async (patientId) => {
    const appointments = await bookingRepository.getAppointment(patientId);
    return appointments;
  };

module.exports = {
    addBooking,
    getBooking,
};
  