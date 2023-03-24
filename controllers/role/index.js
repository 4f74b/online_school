module.exports.isTeacher = async function (req, res, next) {
    if (req.user) {
        if (req.user.role == 'teacher') {
            next();
        } else {
            res.render('error/error');
        }
    } else {
        res.send('Not Logged in');
    }
}
module.exports.isAdmin = async function (req, res, next) {
    if (req.user) {
        if (req.user == 'admin') {
            next();
        } else {
            res.render('error/error');
        }
    } else {
        res.send('Not Logged in');
    }
}
module.exports.isStudent = async function (req, res, next) {
    if (req.user) {
        if (req.user == 'student') {
            next();
        } else {
            res.render('error/error');
        }
    } else {
        res.send('Not Logged in');
    }
}