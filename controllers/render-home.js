const User = require('../data-modals/user');
module.exports = async function (req, res) {
    switch (req.user.role) {
        case 'student':
            res.render('student/home-page', { currentUser: req.user });
            break;
        case 'teacher':
            const teacher = await User.findById(req.user._id).populate([
                { path: 'userProfile' },
                { path: 'assigned_subjecs' }
            ])
            console.log(teacher);
            res.render('teacher/index', { currentUser: req.user });
            break;
        case 'admin':
            res.render('admin/', { currentUser: req.user });
            break;
    }
}