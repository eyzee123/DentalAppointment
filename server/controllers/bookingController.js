const bookingService = require('../services/bookingService');

const createAppointment = async(req, res) => {
    const { dentistId, patientId, timeslotId  } = req.body;
    try {
        const timeslots = await bookingService.addBooking(dentistId, patientId, timeslotId);
        return res.status(200).json(timeslots);
    } catch (err) {
        console.error(err);
        return res.status(400).json({ error: err.message });
    }
}

const getAppointments = async(req, res) => {
    const { patientId } = req.params;
    try {
        const appointments = await bookingService.getBooking(patientId);
        return res.status(200).json(appointments);
    } catch (err) {
        console.error(err);
        return res.status(400).json({ error: err.message });
    }
}


module.exports = {
    createAppointment,
    getAppointments
};