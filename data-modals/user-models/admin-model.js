const mongoose = require('mongoose');
const adminSchema = mongoose.Schema({
    phoneNumber: { type: String },
    address: {
        type: String,
        required: true,
    },
})

// adding a post delete middleware to student schema so that it could run before deleting some student
adminSchema.post("findOneAndDelete", async function (deletedHostellite, next) {
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


const AdminModel = mongoose.model("Admin", adminSchema);
module.exports = AdminModel;