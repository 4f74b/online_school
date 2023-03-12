const Teacher = require('../../data-modals/user-models/teacher-model');

module.exports.getTeacherBySubjectAndGradeAndSlot = async function (req, res) {
    try {
        req.params.subject = req.params.subject.toLowerCase();
        if (req.params.slot == 'null') {
            res.send(await Teacher.find({ subjects: { $in: [req.params.subject] } }).populate('userInfo'));
        } else {
            console.dir(await Teacher.find({ subjects: { $in: [req.params.subject] }, availability: { $elemMatch: { slot: '08:15' } }, availability: { $elemMatch: { name: 'monday' } }, }).populate('userInfo'))
            res.send(await Teacher.find({ subjects: { $in: [req.params.subject] }, availability: { $elemMatch: { slot: '08:15' } }, availability: { $elemMatch: { name: 'monday' } }, }).populate('userInfo'));
        }
    } catch (err) {
        res.send(err);
    }
}