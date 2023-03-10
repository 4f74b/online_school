const User = require("../../data-modals/user");
const Student = require('../../data-modals/user-models/student-model');
const Teacher = require('../../data-modals/user-models/teacher-model');
const Admin = require('../../data-modals/user-models/admin-model');
const fs = require("fs");
const Joi = require('joi');

async function register(req, res) {
    let newUser;
    if ((await User.findOne({ email: req.body.email })) == null) {
        try {
            switch (req.body.role) {
                case 'admin':
                    newUser = Admin({ ...req.body })
                    break;
                case 'teacher':
                    console.log('helllo');
                    Teacher({ ...req.body });
                    break;
                default:
                    newUser = Student({ ...req.body });
            }
            let std = await User({ ...req.body });
            std.userProfile = newUser._id;
            console.log(newUser);

            //if the User data contains file, then create a path in public directory to save it
            // if (req.file) {
            //   //save the file
            //   fs.writeFileSync("public/hostel-files/hostellite-profile-images/" + req.body.username + "." + req.file.originalname.split(".")[1], req.file.buffer, (err) => {
            //     console.log(err);
            //   });
            //   std.profileImage = req.body.username + "." + req.file.originalname.split(".")[1];
            // }
            await newUser.save();
            std = await User.register(std, req.body.password);
            req.login(std, (err) => {
                if (err) {
                    req.flash('error', "Error occured while logging in");
                    res.redirect("/" + res.locals.domainName + "/" + req.body.role + "/login");
                } else {
                    req.flash("success", "Welcome!!!");
                    res.redirect("/" + res.locals.domainName + "/student");
                }

            })
        } catch (err) {
            req.flash("error", err.message + " (You may have left some of the fields empty)");
            res.status(403);
            res.redirect("/" + res.locals.domainName + "/" + req.body.role + "/register");
        }

    } else {
        req.flash("error", req.body.role + " with the provided email '" + req.body.email + "' is already registered");
        res.redirect("/" + res.locals.domainName + "/" + req.body.role + "/register");
    }
}

module.exports = register;