const Student = require("../../data-modals/user");
const fs = require("fs");
const Joi = require('joi');

async function uploadProfile(req, res) {
    if ((await Student.findOne({ username: req.body.username })) == null) {
        try {

            const std = await Student({
                ...req.body,
            });

            //if the Student data contains file, then create a path in public directory to save it
            // if (req.file) {
            //   //save the file
            //   fs.writeFileSync("public/hostel-files/hostellite-profile-images/" + req.body.username + "." + req.file.originalname.split(".")[1], req.file.buffer, (err) => {
            //     console.log(err);
            //   });
            //   std.profileImage = req.body.username + "." + req.file.originalname.split(".")[1];
            // }
            await Student.register(std, req.body.password);
            res.redirect("/" + res.locals.domainName + "/admin/hostellites-list");
        } catch (err) {
            req.flash("error", err.message);
            res.redirect("/" + res.locals.domainName + "/student/register");
        }

    } else {
        req.flash("error", "A student with the provided username '" + req.body.username + "' is already registered");
        res.redirect("/" + res.locals.domainName + "/student/register");
    }
}

module.exports = uploadProfile;