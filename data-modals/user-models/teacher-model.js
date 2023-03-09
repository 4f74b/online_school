const mongoose = require('mongoose');
const TeacherSchema = mongoose.Schema({
    subjects: {
        type: [String],
        required: true
    },
    experience: {
        type: Number,
        required: true
    },
    availability: {
        type: [String],
        required: true
    },
    qualifications: [{
        name: {
            type: String,
            required: true
        },
        issuingAuthority: {
            type: String,
            required: true
        },
        issueDate: {
            type: Date,
            required: true
        }
    }],
    teachingExperience: [{
        subject: {
            type: String,
            required: true
        },
        level: {
            type: String,
            required: true
        },
        institution: {
            type: String,
            required: true
        },
        startDate: {
            type: Date,
            required: true
        },
        endDate: {
            type: Date,
            required: true
        }
    }],
    reviews: [{
        studentName: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },
        rating: {
            type: Number,
            required: true
        },
        comment: {
            type: String,
            required: true
        }
    }],
    profilePictureUrl: {
        type: String,
    }
})

// adding a post delete middleware to student schema so that it could run before deleting some student
TeacherSchema.post("findOneAndDelete", async function (deletedHostellite, next) {
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


const TeacherModel = mongoose.model("Teacher", TeacherSchema);
module.exports = TeacherModel;