const mongoose = require("mongoose");
const fs = require("fs");
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new mongoose.Schema({
  profileImage: {
    type: String,
  },

  fullName: {
    type: String,
    required: true,
  },
  fatherName: {
    type: String,
    required: true,
  },
  DOB: {
    type: Array,
    required: true,
  },
  contact: {
    email: {
      type: String,
      required: true,
    },
    phoneNo: {
      type: String,
    },
    address: {
      country: {
        type: String,
        required: true,
      },
      streetAddress: {
        type: String,
        required: true,
      },
    },
  },
  education: {
    InstituteName: {
      type: String,
      required: true,
    },
    previous_grade: {
      type: String,
      required: true,
    },
    start: {
      type: String,
      required: true,
    },
    end: {
      type: String,
      required: true,
    },
  },
  complaint: [mongoose.Schema.Types.ObjectId],
  recoveryQs: {
    q1: {
      type: String,
    },
    q2: {
      type: String,
    },
  },
  role: {
    type: String,
    default: "student",
    required: true,
  },
});

// adding a post delete middleware to student schema so that it could run before deleting some student
userSchema.post("findOneAndDelete", async function (deletedHostellite, next) {
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
userSchema.plugin(passportLocalMongoose);

const User = mongoose.model("User", userSchema);
module.exports = User;