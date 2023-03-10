const mongoose = require('mongoose');
const StudentSchema = mongoose.Schema({
    fatherName: {
        type: String,
        required: true,
    },
    DOB: {
        type: Array,
        required: true,
    },
    contact: {
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
        instituteName: {
            type: String,
        },
        previous_grade: {
            type: String,
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
    userInfo: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    }
})

// adding a post delete middleware to student schema so that it could run before deleting some student
StudentSchema.post("findOneAndDelete", async function (deletedHostellite, next) {
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


const StudentModel = mongoose.model("Student", StudentSchema);
module.exports = StudentModel;