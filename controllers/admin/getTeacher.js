const Teacher = require('../../data-modals/user-models/teacher-model');

module.exports.getTeacherQuery = async function (req, res) {
    console.log(req.query);
    try {
        if (!req.query.slot && !req.query.day && req.query.subject) {
            req.query.subject.toLowerCase();
            res.send(await Teacher.find({ subjects: { $in: [req.query.subject] } }).populate('userInfo'));
        } else if (!req.query.slot && req.query.day && req.query.subject) {
            req.query.subject.toLowerCase();
            res.send(await Teacher.find({ subjects: { $in: [req.query.subject] }, availability: { $elemMatch: { name: req.query.day } }, }).populate('userInfo'));
        }
        else if (req.query.slot && req.query.subject && req.query.day) {
            console.log(await Teacher.find({ subjects: { $in: [req.query.subject] }, availability: { $elemMatch: { slot: req.query.slot } }, availability: { $elemMatch: { name: req.query.day } } }).populate('userInfo'))
            res.send(await Teacher.find({ subjects: { $in: [req.query.subject] }, availability: { $elemMatch: { slot: req.query.slot } }, availability: { $elemMatch: { name: req.query.day } } }).populate('userInfo'));
        }
    } catch (err) {
        res.send(err);
    }
}