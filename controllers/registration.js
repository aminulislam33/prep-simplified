const Registration = require("../models/Registration");

const handleRegistration = async (req,res)=>{
    try {
        const { name, email, phone, year } = req.body;
    
        if (!name || !email || !phone || !year) {
          return res.status(400).json({ message: 'All fields are required' });
        }
    
        const registration = new Registration({ name, email, phone, year });
        const savedRegistration = await registration.save();
    
        res.status(201).json({
          message: 'Registration successful',
          user: savedRegistration,
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to register' });
      }
};

module.exports = handleRegistration;