module.exports.isTeacher = async function (req, res, next) {
    if (req.user) {
        if (req.user.isTeacher) {
            next();
        } else {
            res.render('error/error');
        }
    } else {
        res.send('Not Logged in');
    }
}