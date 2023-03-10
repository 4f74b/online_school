const express = require("express");
const router = express.Router();
const configurePassport = require("../controllers/passport/configure-passport");
const passport = require("passport");
const multer = require("multer");

const register = require('../controllers/register/register');
const renderHomePage = require('../controllers/render-home');

const storage = multer.memoryStorage();
const upload = multer({ storage });


// ==================================================Home page========================================================
router.get('/', renderHomePage);

// =================--------------------------Register related routes======================================================
router
  .route("/register")
  // render register form
  .get((req, res) => {
    res.render("register/register-student");
  })
  //   render register data
  .post(register);


// =================--------------------------login/logout related routes======================================================
// router
//   .route("/login")
//   // render login form
//   .get((req, res) => {
//     res.render("login/login");
//   })
//   //   render login data
//   .post(
//     configurePassport,
//     passport.authenticate("user", { failureFlash: true, failureRedirect: "/eduafghan/student/login" }),
//     catchAsync(function (req, res) {
//       req.flash("success", "Welcome " + req.user.fullName);
//       res.redirect("/eduafghan/student/notice-board");
//     })
//   );

// // logout Student
// router.get("/logout", isLoggedIn, catchAsync(logoutStudent));

// =========================================For the following routes, check if a student is logged in=========================
// router.use(catchAsync(isLoggedIn));

// ===============================------------===========Complaint Routers------------=========================================
// Write complaint
// router.get("/post-complaint", isStudent, (req, res) => {
//   res.render("complaint/write-complaint");
// });
// // Recieve complaint request data
// router.post(
//   "/post-complaint/:username",
//   isStudent,
//   catchAsync(async (req, res) => {
//     const complaint = await addComplaint(req.body, req.user);
//     req.flash("success", "Successfully added complaint");
//     res.redirect("/dormitory/student/complaint-log/" + req.params.username);
//   })
// );

// //show all complaints
// router.get(
//   "/complaint-log/:username",
//   isStudent,
//   catchAsync(async (req, res) => {
//     const complaints = await getComplaintLog(req.params.username);
//     res.render("complaint/complaint-log", { complaints });
//   })
// );

// router.post(
//   "/complaint-log/:id/delete",
//   isStudent,
//   catchAsync(async (req, res) => {
//     const complaint = await deleteComplaint(req.params.id);
//     res.send(complaint);
//   })
// );

//   =====================Notice board related routes===================================================
// Show notice board
// router.get(
//   "/notice-board",
//   isStudent,
//   catchAsync(async (req, res) => {
//     const noticeList = await showNoticeBoard();
//     res.render("notice-board/", { noticeList });
//   })
// );

// ========================================Student show/read/delete-----------======================================
// Show student profile
// router.get("/:username", catchAsync(isAuthorized), catchAsync(showHostellite));

// Show account settings for student and also update and delete routes
// router.route("/:username/edit").get(catchAsync(isAuthorized), catchAsync(fillEditForm)).post(upload.single("profileImage"), catchAsync(updateHostellite));

module.exports = router;