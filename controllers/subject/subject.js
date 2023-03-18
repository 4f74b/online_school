const Class = require('../../data-modals/class/class');
const Subject = require('../../data-modals/class/subject');
const Material = require('../../data-modals/class/material');

module.exports.viewSubject = async function (req, res) {
    const subject = await Subject.findById(req.params.id);
    const cls = await Class.findById(subject.class).populate([
        { path: 'courses', match: { _id: subject._id }, populate: { path: 'teacher', populate: { path: 'userInfo' } } },
        { path: 'students', populate: { path: 'userInfo' } }
    ]);
    res.render('subject/view-subject', { cls });
}

module.exports.addMaterialToSubject = async function (req, res) {
    let material = await new Material({ ...req.body })
}