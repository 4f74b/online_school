module.exports = async function (req, res) {
    switch (req.user.role) {
        case 'student':
            res.redirect('/student');
            break;
        case 'teacher':
            req.flash('success', `Welcome ${req.user.fullName}`);
            res.redirect('/teacher');
            break;
        case 'admin':
            res.redirect('/admin');
            break;
        default:
            res.status(404).send('Role no identified');
    }
}