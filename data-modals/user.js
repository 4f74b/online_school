const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const UserSchema = new mongoose.Schema({
  profileImage: {
    type: String,
  },

  fullName: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['student', 'teacher', 'admin'],
    default: 'student',
    required: true
  },
  userProfile: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Student',
  }
});



// adding a post delete middleware to student schema so that it could run before deleting some student
UserSchema.post("findOneAndDelete", async function (deletedHostellite, next) {
  //   //Delete any associated files
  //   if (deletedHostellite.profileImage) {
  //     fs.unlink("public/hostel-files/hostellite-profile-images/" + deletedHostellite.profileImage, (err) => {
  //       if (err) {
  //         throw err;
  //       }
  //     });
  //   }

  //   // Delete any complaints
  //   if (deletedHostellite.complaint.length) {
  //     for (complaintId of deletedHostellite.complaint) {
  //       await Complaint.findByIdAndDelete(complaintId);
  //     }
  //   }
  next();
});

// pre findOneAndUpdate check if the password is updated, if so, then hash the password
// studentSchema.pre("updateOne", async function (next) {
//   try {
//     if (this._update.password) {
//       console.log(this);
//       const hashed = await bcrypt.hash(this._update.password, 10);
//       this._update.password = hashed;
//       console.log(this);
//     }
//     next();
//   } catch (err) {
//     return next(err);
//   }
// });

//The following statement will add username and password field to our schema and will make sure that the usename is unique
UserSchema.plugin(passportLocalMongoose, { usernameField: 'email' });

const User = mongoose.model("User", UserSchema);
module.exports = User;