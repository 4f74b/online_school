const mongoose = require('mongoose');
const assignmentSchema = new mongoose.Schema({
    assignmentDetail: { type: String },
    assignmentTitle: { type: String },
    teacher: { type: mongoose.Types.ObjectId, ref: 'Teacher' },
    subject: {
        type: mongoose.Types.ObjectId, ref: 'Subject'
    },
    files: [{
        filename: String,
        id: {
            type: mongoose.Types.ObjectId,
            ref: 'SubjectFile'
        }
    }],
    createdAt: {
        type: Date,
        default: Date.now
    },
    assignmentType: {
        type: String,
        enum: ['graded', 'Ungraded'],
    },
    totalPoints: {
        type: Number,
        default: 100
    },
    hasDueDate: {
        type: Boolean
    },
    dueDate: {
        type: Date
    }
});


module.exports = mongoose.model('Assignmnet', assignmentSchema);
