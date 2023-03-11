const Student = require('../../data-modals/user-models/student-model');
module.exports.getStudentWithGrade = async function (req, res) {
    try {
        res.send(await Student.find({ grade: req.params.class }).populate('userInfo'));
    } catch (err) {
        res.send(err.message);
    }
}