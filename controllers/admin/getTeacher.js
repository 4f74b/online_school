const Teacher = require('../../data-modals/user-models/teacher-model');

module.exports.getTeacherQuery = async function (req, res) {
    try {
        if (!req.query.slot && !req.query.day && req.query.subject) {
            req.query.subject.toLowerCase();
            res.send(await Teacher.find({ subjects: { $in: [req.query.subject] } }).populate('userInfo'));
        } else if (!req.query.slot && req.query.day && req.query.subject) {
            req.query.subject.toLowerCase();
            res.send(await Teacher.find({ subjects: { $in: [req.query.subject] }, availability: { $elemMatch: { name: req.query.day } }, }).populate('userInfo'));
        }
        else if (req.query.slot && req.query.subject && req.query.day) {
            let allteachers = await Teacher.find({ subjects: { $in: [req.query.subject] } }).populate('userInfo');
            let availableTeachers = [];
            for (teacher of allteachers) {
                for (avail of teacher.availability) {
                    if (avail.name == req.query.day && avail.slot.includes(req.query.slot)) {
                        availableTeachers.push(teacher);
                    }
                }
            }
            res.send(availableTeachers);
        }
    } catch (err) {
        res.send(err);
    }
}