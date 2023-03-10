module.exports = async function (req, res) {
    switch (req.user.role) {
        case 'student':
            res.render('student/home-page', { currentUser: req.user });
            break;
        case 'teacher':
            res.render('student/home-page', { currentUser: req.user });
            break;
        case 'admin':
            res.render('admin/', { currentUser: req.user });
            break;
    }
}