const mongoose = require('mongoose');
const User = require('../../data-modals/user');

module.exports.showStudentDashboard = async function (req, res) {
    // const student = await User.findById(req.user._id)
    //     .populate([
    //         {
    //             path: 'userProfile',
    //             populate: {
    //                 path: 'admittedClass',
    //                 populate: {
    //                     path: 'courses', populate: [{ path: 'assignment' }, { path: 'material' }], select: ['-students']
    //                 }
    //             }
    //         }
    //     ])
    // console.log(student)
    res.render('student/dashboard');
}