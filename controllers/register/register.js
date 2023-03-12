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
            let std = await User({ ...req.body });
            switch (req.body.role) {
                case 'admin':
                    newUser = Admin({ ...req.body })
                    std.subModel = 'Admin'
                    break;
                case 'teacher':
                    // console.log(Object.values(req.body.day));
                    req.body.qualification = Object.values(req.body.qualification);
                    req.body.teachingExperience = Object.values(req.body.teachingExperience);
                    req.body.availability = []
                    for (let day of Object.values(req.body.day)) {
                        req.body.availability.push({ name: day[0], slot: day[1] });
                    }
                    newUser = Teacher({ ...req.body });
                    std.subModel = 'Teacher'
                    break;
                default:
                    newUser = Student({ ...req.body });
                    std.subModel = 'Student';
                    break;
            }
            std.userProfile = newUser._id;

            //if the User data contains file, then create a path in public directory to save it
            // if (req.file) {
            //   //save the file
            //   fs.writeFileSync("public/hostel-files/hostellite-profile-images/" + req.body.username + "." + req.file.originalname.split(".")[1], req.file.buffer, (err) => {
            //     console.log(err);
            //   });
            //   std.profileImage = req.body.username + "." + req.file.originalname.split(".")[1];
            // }
            newUser.userInfo = std._id;
            await newUser.save();
            std = await User.register(std, req.body.password);
            req.login(std, (err) => {
                if (err) {
                    req.flash('error', "Error occured while logging in");
                    res.redirect("/" + res.locals.domainName + "/" + req.body.role + "/login");
                } else {
                    req.flash("success", "Welcome!!!");
                    const redirectUrl = req.session.returnTo || "/" + res.locals.domainName + "/student";
                    delete req.session.returnTo;
                    res.redirect(redirectUrl);
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