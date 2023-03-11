const Teacher = require('../../data-modals/user-models/teacher-model');
const Student = require('../../data-modals/user-models/student-model');
const User = require('../../data-modals/user');


module.exports.renderAddGrade = async function (req, res) {
    try {
        res.render('admin/add-grade');

    } catch (err) {
        req.flash('err', 'Error Occured');
        res.render('admin/error');
    }
}

