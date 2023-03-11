const User = require('../../data-modals/user');
module.exports.getStudentWithGrade = async function (req, res) {
    console.log(req.body);
    try {
        res.send(await User.find({ grade: req.body.grade }));
    } catch (err) {
        res.send(err.message);
    }
}