const express = require('express');
const router = express.Router();
const registrationController = require('../controllers/registrationController');

// Route to get all registrations
router.get('/registrations', registrationController.getAllRegistrations);

// Route to delete a registration by ID
router.delete('/registrations/:id', registrationController.deleteRegistration);

// Route to update a registration by ID
router.put('/registrations/:id', registrationController.updateRegistration);
router.get('/export', registrationController.exportRegistrations);

module.exports = router;