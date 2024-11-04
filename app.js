const express = require('express');
const path = require('path');
const connectDB = require('./config/db');

const app = express();
connectDB();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api', require('./route/route'));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  });

app.get('/registration', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'registration.html'));
  });

module.exports = app;