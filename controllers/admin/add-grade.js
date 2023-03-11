const Teacher = require('../../data-modals/user-models/teacher-model');
const Student = require('../../data-modals/user-models/student-model');
const User = require('../../data-modals/user');


async function getTeachers() {
    return await User.find({ role: 'teacher' }).populate('userProfile');
}

async function getStudents() {
    return await User.find({ role: 'student' }).populate('userProfile');
}


module.exports.renderAddGrade = async function (req, res) {
    try {
        res.render('admin/add-grade', { teachers: await getTeachers(), students: await getStudents() });

    } catch (err) {
        req.flash('err', 'Error Occured');
        res.render('admin/error');
    }
}

