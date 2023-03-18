const mongoose = require('mongoose');
const materialSchema = new mongoose.Schema({
    materialDetail: { type: String },
    teacher: { type: mongoose.Types.ObjectId, ref: 'Teacher' },
    subject: {
        type: mongoose.Types.ObjectId, ref: 'Subject'
    },
    files: [{
        filename: String,
        data: Buffer
    }]
});

module.exports = mongoose.model('Material', materialSchema);
