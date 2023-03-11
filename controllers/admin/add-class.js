const Teacher = require('../../data-modals/user-models/teacher-model');
const Student = require('../../data-modals/user-models/student-model');
const User = require('../../data-modals/user');


module.exports.renderAddClass = async function (req, res) {
    try {
        res.render('admin/add-class');

    } catch (err) {
        req.flash('err', 'Error Occured');
        res.render('admin/error');
    }
}

module.exports.addClass = async function (req, res) {
    req.body.students = Object.values(req.body.students);
    req.body.subjects = Object.values(req.body.subjects);
    console.log(req.body);
}

