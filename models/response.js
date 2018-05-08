const mongoose = require('mongoose');

// Model
const responseSchema = mongoose.Schema({
    name: String,
    email: String,
    attending: Boolean,
    guests: Number
});

// Instance
const Response = mongoose.model('Response', responseSchema);

module.exports = Response;

