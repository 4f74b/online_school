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
    courses: [{ type: mongoose.Types.ObjectId, ref: 'Subject' }],
    created: {
        type: Date,
        default: Date.now,
    }
});

module.exports = mongoose.model('Class', classSchema);
