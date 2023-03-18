const mongoose = require('mongoose');
const materialSchema = new mongoose.Schema({
    materialDetail: { type: String },
    teacher: { type: mongoose.Types.ObjectId, ref: 'Teacher' },
    subject: {
        type: mongoose.Types.ObjectId, ref: 'Subject'
    },
    subject_material: [{
        filename: String,
        contentType: String,
        data: Buffer
    }]
});

module.exports = mongoose.model('Material', materialSchema);
