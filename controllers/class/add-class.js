const Class = require('../../data-modals/class/class');
const Subject = require('../../data-modals/class/subject');
const Student = require('../../data-modals/user-models/student-model');
const Teacher = require('../../data-modals/user-models/teacher-model');


module.exports.renderAddClass = async function (req, res) {
    try {
        res.render('admin/add-class');

    } catch (err) {
        req.flash('err', 'Error Occured');
        res.render('admin/error');
    }
}

module.exports.addClass = async function (req, res) {
    try {
        let students = [];
        // Create array of students
        if ((typeof req.body.students.id) == 'object') {
            req.body.students = Object.values(req.body.students);
            if (req.body.students[0].length > 1) {
                for (let student of req.body.students[0]) {
                    students.push(student);

                }
                req.body.students = students;

            }
        } else {
            req.body.students = Object.values(req.body.students);
        }
        if (req.body.subjects) {
            req.body.subjects = Object.values(req.body.subjects);
        }
        let cls = new Class({ ...req.body });

        // add class id to each student and also add admission date
        for (let id of req.body.students) {
            const upd = await Student.findByIdAndUpdate(id, { admittedClass: cls._id, admissionDate: Date.now() });
        }
        if (req.body.subjects) {
            for (let subject of req.body.subjects) {
                let sub = new Subject({ ...subject });
                sub = await sub.save();
                cls.courses.push(sub._id);
            }
        }
        await cls.save();

    } catch (err) {
        console.log('error');
        res.send(err);
    }
}

