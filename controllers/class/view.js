const Class = require('../../data-modals/class/class');
module.exports.viewStaticClass = async function (req, res) {
    const cls = await Class.findById(req.params.classId).populate([
        {
            path: 'courses',
            populate: [
                {
                    path: 'teacher',
                    populate: { path: 'userInfo' }
                },
                {
                    path: 'material',
                    select: ['materialDetail', 'materialTitle', 'createdAt', 'files.filename', 'files.id'],
                },
                {
                    path: 'assignment',
                    select: ['assignmentDetail', 'assignmentTitle', 'createdAt', 'dueDate', 'assignmentType', 'totalPoints', 'files.filename', 'files.id'],
                },
            ],
        },
    ]);
    console.log(cls);
    res.render('class/overview-static-class', { cls });
}

module.exports.viewInteractiveClass = async function (req, res) {
    const cls = await Class.findById(req.params.classId).populate([
        {
            path: 'courses',
            populate: [
                {
                    path: 'teacher',
                    populate: { path: 'userInfo' }
                },
                {
                    path: 'material',
                    select: ['materialDetail', 'materialTitle', 'createdAt', 'files.filename', 'files.id'],
                },
                {
                    path: 'assignment',
                    select: ['assignmentDetail', 'assignmentTitle', 'createdAt', 'dueDate', 'assignmentType', 'totalPoints', 'files.filename', 'files.id'],
                },
            ],
        },
    ]);
    res.render('class/overview-interactive-class', { cls });
}


module.exports.viewAllClasses = async function (req, res) {
    console.log(req.originalUrl.split('/')[2]);
}