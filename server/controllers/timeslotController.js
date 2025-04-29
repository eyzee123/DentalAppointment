const timeslotService = require('../services/timeslotService');

const getTimeSlot = async(req, res) => {
    const { dentistId, appointmentDate  } = req.body;
    try {
        const timeslots = await timeslotService.getTimeSlot(dentistId, appointmentDate);
        return res.status(200).json(timeslots);
    } catch (err) {
        console.error(err);
        return res.status(400).json({ error: err.message });
    }
}

module.exports = {
    getTimeSlot,
};