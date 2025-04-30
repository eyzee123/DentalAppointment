const bookingRepository = require('../repositories/bookingRepository');


const addBooking = async (dentistId, patientId, timeslotId) => {
  const appointment = await bookingRepository.createAppointment(dentistId, patientId, timeslotId);
  return appointment;
};

const getBooking = async (patientId) => {
    const appointments = await bookingRepository.getAppointment(patientId);
    return appointments;
  };

const cancelBooking = async (bookingId) => {
  const appointments = await bookingRepository.cancelAppointment(bookingId);
  return appointments;
};

const updateBooking = async (appointment, bookingId) => {
  const appointments = await bookingRepository.updateAppointment(appointment, bookingId);
  return appointments;
};


module.exports = {
    addBooking,
    getBooking,
    cancelBooking,
    updateBooking
};
  