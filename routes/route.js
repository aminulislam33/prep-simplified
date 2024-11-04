const express = require('express');
const handleRegistration = require('../controllers/registration');
const router = express.Router();

router.post('/register', handleRegistration);

module.exports = router;