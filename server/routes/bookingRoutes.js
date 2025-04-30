const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');

router.post('/', bookingController.createAppointment);
router.get('/:patientId', bookingController.getAppointments);
router.patch('/:bookingId', bookingController.cancelAppointment);
router.put('/:bookingId', bookingController.updateAppointment);

module.exports = router;