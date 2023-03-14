const Teacher = require('../../data-modals/user-models/teacher-model');

module.exports.getTeacherQuery = async function (req, res) {
    let availableTeachersAndSlots = { availableTeachers: [], availableDaysAndSlots: [] };
    try {
        if (!req.query.slot && !req.query.day && req.query.subject) {
            req.query.subject.toLowerCase();
            const teachers = await Teacher.find({ subjects: { $in: [req.query.subject] } }).populate('userInfo');
            for (teacher of teachers) {
                availableTeachersAndSlots.availableTeachers.push({
                    fullName: teacher.userInfo.fullName,
                    _id: teacher.userInfo._id,
                    gender: teacher.gender,
                    address: teacher.address
                });
                availableTeachersAndSlots.
            }
            res.send(availableTeachers);
        } else if (!req.query.slot && req.query.day && req.query.subject) {
            req.query.subject.toLowerCase();
            res.send(await Teacher.find({ subjects: { $in: [req.query.subject] }, availability: { $elemMatch: { name: req.query.day } }, }).populate('userInfo'));
        }
        else if (req.query.slot && req.query.subject && req.query.day) {
            let availableTeachers;
            let allteachers = await Teacher.find({ subjects: { $in: [req.query.subject] } }).populate('userInfo');
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