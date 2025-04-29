const express = require('express');
const router = express.Router();
const dentistController = require('../controllers/dentistController');
const timeslotController = require('../controllers/timeslotController');

router.get('/', dentistController.getDentists);
router.post('/timeslot', timeslotController.getTimeSlot);

module.exports = router;