const Admin = require('../../data-modals/user-models/admin-model');

module.exports.viewAllAdmins = async function (req, res) {
    let allAdmins = await Admin.find().populate('userInfo');
    res.render('admin/view-all-admins', { allAdmins });
}