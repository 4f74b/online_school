const mongoose = require('mongoose');
const subjectSchema = new mongoose.Schema({
    name: { type: String },
    schedule: [{}],
    teacher: { type: String, ref: 'Teacher' }
});

module.exports = mongoose.model('Subject', subjectSchema);
