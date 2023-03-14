const Class = require('../../data-modals/class/class');
module.exports.renderAllClasses = async function (req, res) {
    const allClss = await Class.find().populate([
        { path: 'courses' },
        { path: 'students' }
    ]);
    res.render('admin/all-class', { allClss });
}

module.exports.viewClass = async function (req, res) {
    const cls = await Class.findById(req.params.id);
    res.render('admin/view-class', { cls })
}