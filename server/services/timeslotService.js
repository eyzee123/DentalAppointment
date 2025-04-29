const timeslotRepository = require('../repositories/timeslotRepository');


const getTimeSlot = async (dentist_id,appointment_date) => {
  const timeslots = await timeslotRepository.getTimeSlot(dentist_id,appointment_date);
  return timeslots;
};

module.exports = {
    getTimeSlot,
};
  