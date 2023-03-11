const mongoose = require('mongoose');
const classSchema = new mongoose.Schema({
    classType: {
        type: String,
        enum: ['interactive', 'static']
    },
    classLevel: {
        type: Number,
        min: 1,
        max: 12
    },
    section: {
        type: String,
        enum: ['Pink', 'Blue', 'Bird', 'Rose', 'Red']
    },
    classID: { type: String },
    students: [{ type: mongoose.Types.ObjectId, ref: 'Student' }],
    subjects: [{ type: mongoose.Types.ObjectId, ref: 'Subject' }]
});

module.exports = mongoose.model('Class', classSchema);
