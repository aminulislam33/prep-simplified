const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema({
    name: String,
    email: { type: String, required: true, unique: true },
    phone: String,
    year: Number,
  });

const Registration = mongoose.model('registrationSchema', registrationSchema);

module.exports = Registration;