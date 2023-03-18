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
    let material = await new Material({ ...req.body });
    for (let file of req.files) {
        material.files.push({
            filename: file.originalname,
            data: file.buffer
        })
    }
    material.subject = req.params.subjectId;
    await material.save();
    req.flash('success', 'Successfully added new material to class');
    res.redirect(`/${res.locals.domainName}/teacher/subject/${req.params.subjectId}/view`)
}