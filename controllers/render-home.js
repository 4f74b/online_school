const User = require('../data-modals/user');
module.exports = async function (req, res) {
    switch (req.user.role) {
        case 'student':
            res.render('student/home-page', { currentUser: req.user });
            break;
        case 'teacher':
            let teacher = await User.findById(req.user._id).populate([
                { path: 'userProfile', populate: { path: 'assigned_subjects', populate: { path: 'class', select: ['-courses'], populate: { path: 'students', select: ['education', 'gender', 'fatherName'], populate: { path: 'userInfo', select: 'fullName', }, } } } },

            ])
            teacher = addAdditionalInfoToTeacher(teacher);
            console.log(teacher.totalStudents)
            res.render('teacher/index', { teacher });
            break;
        case 'admin':
            res.render('admin/', { currentUser: req.user });
            break;
    }
}

function addAdditionalInfoToTeacher(teacher) {
    teacher.totalFemaleStudents = 0;
    teacher.totalMaleStudents = 0;
    teacher.totalStudents = 0;
    for (let subject of teacher.userProfile.assigned_subjects) {
        for (let student of subject.class.students) {
            if (student.gender == 'female') {
                teacher.totalFemaleStudents++;
            } else {
                teacher.totalMaleStudents++;
            }
            teacher.totalStudents++;
        }
    }
    return teacher;
}