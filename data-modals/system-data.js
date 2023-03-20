const mongoose = require('mongoose');

const systemSchema = mongoose.Schema({
    totalStudents: {
        type: Number
    },
    totalTeachers: {
        type: Number
    },
    totalStaticClasses: {
        type: Number
    },
    totalInteractiveClasses: {
        type: Number
    },

});

module.exports = mongoose.model('System', systemSchema);