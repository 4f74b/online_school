const mongoose = require('mongoose');
const System = require('../system-data');
const classSchema = new mongoose.Schema({
    classType: {
        type: String,
        enum: ['interactive', 'static'],
        required: true
    },
    classLevel: {
        type: Number,
        min: 1,
        max: 12,
        required: true
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
    },
    putOnHomePage: {
        type: Boolean,
        default: false
    }
});

// When a class is saved then icrement the system data
// When a user is saved then icrement the system data
UserSchema.post('save', async (cls, next) => {
    let sys;
    console.log(await System.find());
    // switch (cls.role) {
    //     case 's':
    //         sys = await System.findOneAndUpdate({}, { $inc: { totalStudents: 1 } }, { new: true })
    //         break;
    //     case 'teacher':
    //         sys = await System.findOneAndUpdate({}, { $inc: { totalTeachers: 1 } }, { new: true })
    //         break;
    // }
    next();
});

module.exports = mongoose.model('Class', classSchema);


