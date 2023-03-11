module.exports.renderAddClass = function (req, res) {
    try {
        res.render('admin/add-class');

    } catch (err) {
        req.flash('err', 'Error Occured');
        res.render('admin/error');
    }
}