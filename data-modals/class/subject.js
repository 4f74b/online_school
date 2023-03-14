const mongoose = require('mongoose');
const subjectSchema = new mongoose.Schema({
    name: { type: String },
    slot: { type: String },
    day: { type: String },
    teacher: { type: String }
});

module.exports = mongoose.model('Subject', subjectSchema);
