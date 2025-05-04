const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');


router.patch('/:userId', userController.updateUser);

module.exports = router;