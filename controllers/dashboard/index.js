const mongoose = require('mongoose');

module.exports.showStudentDashboard = async function (req, res) {
    res.render('student/dashboard');
}