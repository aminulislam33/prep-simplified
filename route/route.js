const express = require('express');
const handleRegistration = require('../controller/registration');
const router = express.Router();

router.post('/register', handleRegistration);

module.exports = router;