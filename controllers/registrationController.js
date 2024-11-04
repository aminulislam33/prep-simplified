const Registration = require("../models/Registration");
const XLSX = require('xlsx');
const fs = require('fs');

// Get all registrations
exports.getAllRegistrations = async (req, res) => {
  try {
    const registrations = await Registration.find();
    res.json(registrations);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching registrations' });
  }
};

// Delete a registration by ID
exports.deleteRegistration = async (req, res) => {
  try {
    const { id } = req.params;
    await Registration.findByIdAndDelete(id);
    res.json({ message: 'Registration deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting registration' });
  }
};

// Update a registration by ID
exports.updateRegistration = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phone, year } = req.body;
    const updatedRegistration = await Registration.findByIdAndUpdate(id, { name, email, phone, year }, { new: true });
    res.json(updatedRegistration);
  } catch (error) {
    res.status(500).json({ message: 'Error updating registration' });
  }
};

exports.exportRegistrations = async (req, res) => {
  try {
    const registrations = await Registration.find();

    console.log('Fetched registrations:', registrations);

    if (registrations.length === 0) {
      return res.status(404).json({ message: 'No registrations found to export.' });
    }

    const data = registrations.map(reg => ({
      Name: reg.name,
      Email: reg.email,
      Phone: reg.phone,
      Year: reg.year,
    }));

    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(data);
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Registrations');

    const filename = 'registrations.xlsx';
    const uploadsDir = `${__dirname}/../uploads`;

    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    const filePath = `${uploadsDir}/${filename}`;
    XLSX.writeFile(workbook, filePath);

    res.download(filePath, filename, (err) => {
      if (err) {
        console.error('Error downloading file:', err);
        res.status(500).json({ message: 'Error downloading file' });
      }
    });
  } catch (error) {
    console.error('Error exporting registrations:', error);
    res.status(500).json({ message: 'Error exporting registrations' });
  }
};