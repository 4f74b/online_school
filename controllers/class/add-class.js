const Class = require('../../data-modals/class/class');
const Subject = require('../../data-modals/class/subject');


module.exports.renderAddClass = async function (req, res) {
    try {
        res.render('admin/add-class');

    } catch (err) {
        req.flash('err', 'Error Occured');
        res.render('admin/error');
    }
}

module.exports.addClass = async function (req, res) {
    try {
        if (req.body.students) {
            req.body.students = Object.values(req.body.students);
        }
        if (req.body.subjects) {
            req.body.subjects = Object.values(req.body.subjects);
        }
        let cls = new Class({ ...req.body });
        if (req.body.subjects) {
            for (let subject of req.body.subjects) {
                subject = new Subject({ ...subject });
                await subject.save();
                cls.courses.push(subject._id);
            }
        }
        await cls.save();

    } catch (err) {
        req.flash('error', err.message);
        res.redirect('/' + res.locals.domainName + '/admin/add-class');
    }
}

