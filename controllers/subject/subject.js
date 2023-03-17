const Class = require('../../data-modals/class/class');
const Subject = require('../../data-modals/class/subject');

module.exports.viewSubject = async function (req, res) {
    const subject = await Subject.findById(req.params.id);
    const cls = await Class.findById(subject.class).populate([
        { path: 'courses', match: { _id: subject._id }, populate: { path: 'teacher', populate: { path: 'userInfo' } } },
        { path: 'students', populate: { path: 'userInfo' } }
    ]);
    console.log(cls);
    res.render('subject/view-subject', { cls });
}

module.exports.addMaterialToSubject = async function (req, res) {
    console.log(req.body);
}