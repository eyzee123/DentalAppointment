const { response } = require('../app');
const Response = require('../models/ResponseModel');
const bookingService = require('../services/bookingService');

const createAppointment = async(req, res) => {
    const { dentistId, patientId, timeslotId  } = req.body;
    try {
        const timeslots = await bookingService.addBooking(dentistId, patientId, timeslotId);
        const response = new Response({
            statusCode: 200,
            result: {
                success: true, 
                message: 'Appointment booked successfully!',
                data: timeslots
            }
        });
        return res.status(200).json(response);
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

const cancelAppointment = async(req, res) => {
    const { bookingId } = req.params;
    try {
        await bookingService.cancelBooking(bookingId);
        const response = new Response({
            statusCode: 200,
            result: {
                success: true, 
                message: 'Appointment cancelled successfully!',
                data:null
            }
        });
        return res.status(200).json(response);
    } catch (err) {
        console.error(err);
        return res.status(400).json({ error: err.message });
    }
}

const updateAppointment = async(req, res) => {
    const { bookingId } = req.params;
    const appointment = req.body;
    try {
        const resp = await bookingService.updateBooking(appointment,bookingId);
        const response = new Response({
            statusCode: 200,
            result: {
                success: true, 
                message: 'Appointment updated successfully!',
                data: resp
            }
        });
        return res.status(200).json(response);
    } catch (err) {
        console.error(err);
        return res.status(400).json({ error: err.message });
    }
}




module.exports = {
    createAppointment,
    getAppointments,
    cancelAppointment,
    updateAppointment
};