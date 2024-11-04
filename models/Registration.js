const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  year: { type: Number, required: true }
});

const Registration = mongoose.model('Registration', registrationSchema);

module.exports = Registration;