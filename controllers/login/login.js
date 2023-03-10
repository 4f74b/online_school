module.exports = async function (req, res) {
    console.log(req.user);
    switch (req.user.role) {
        case 'student':
            res.redirect('/' + res.locals.domainName + '/student');
            break;
        case 'teacher':
            res.redirect('/' + res.locals.domainName + '/teacher');
            break;
        case 'admin':
            res.redirect('/' + res.locals.domainName + '/admin');
            break;
        default:
            res.status(404).send('Role no identified');
    }
}