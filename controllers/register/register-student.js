const Student = require("../../data-modals/user");
const fs = require("fs");
const Joi = require('joi');

async function uploadProfile(req, res) {
    if ((await Student.findOne({ username: req.body.username })) == null) {
        try {

            let std = await Student({
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
            std = await Student.register(std, req.body.password);
            req.login(std, (err) => {
                if (err) {
                    req.flash('error', "Error occured while logging in");
                    res.redirect("/" + res.locals.domainName + "/student/login");
                } else {
                    req.flash("success", "Welcome!!!");
                    res.redirect("/" + res.locals.domainName + "/student");
                }

            })
        } catch (err) {
            req.flash("error", err.message.split(':')[0] + " (You may have left some of the fields empty)");
            res.status(403);
            res.redirect("/" + res.locals.domainName + "/student/register");
        }

    } else {
        req.flash("error", "A student with the provided username '" + req.body.username + "' is already registered");
        res.redirect("/" + res.locals.domainName + "/student/register");
    }
}

module.exports = uploadProfile;