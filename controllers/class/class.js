const Class = require('../../data-modals/class/class');
module.exports.renderAllClasses = async function (req, res) {
    const allClss = await Class.find().populate([
        { path: 'courses' },
        { path: 'students' }
    ]);
    res.render('admin/all-class', { allClss });
}

module.exports.viewClass = async function (req, res) {
    try {
        const cls = await Class.findById(req.params.id).populate([
            { path: 'courses', populate: { path: 'teacher', populate: { path: 'userInfo' } } },
            { path: 'students' }
        ]);
        res.render('class/view-class', { cls });
    } catch (err) {
        req.flash('error', 'Wrong class Id');
        res.render('error/error')
    }
}