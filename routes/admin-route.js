const express = require("express");
const router = express.Router();
const passport = require("passport");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage });



const register = require('../controllers/register/register');
const renderHomePage = require('../controllers/render-home');
const isLoggedIn = require('../controllers/login/isLoggedIn');
const { getStudentWithGrade } = require('../controllers/admin/get-student');
const { getTeacherQuery } = require("../controllers/admin/getTeacher");
const { renderAddClass } = require('../controllers/class/add-class');
const { addClass } = require('../controllers/class/add-class');
const { renderAllClasses } = require('../controllers/class/class');
const { viewClass } = require('../controllers/class/class');
const { renderViewUser } = require('../controllers/view/view-user');
const { viewSubject } = require("../controllers/subject/subject");






// ==================================================Home page========================================================
router.get('/', isLoggedIn, renderHomePage);

// =================--------------------------Register related routes======================================================
router
    .route("/register")
    // render register form
    .get((req, res) => {
        res.render("register/register-admin");
    })
    //   render register data
    .post(register);

// ==================================================Class Related========================================================
router.route('/add-class')
    .get(renderAddClass)
    .post(addClass)

router.get('/all-class', renderAllClasses)

router.get('/class/:id/view', viewClass);

// ==================================================Subject Related========================================================
router.get('/class/:classId/subject/:subjectId/view', viewSubject)


// ==================================================Student========================================================
// get student related to particular class
router.get('/get-student/with-grade/:class', getStudentWithGrade)
// render view student
router.get('/student/:id/view', renderViewUser);

// ==================================================Teacher========================================================
// get Teacher related to particular course
router.get('/get-teacher', getTeacherQuery)
// render view Teacher
router.get('/teacher/:id/view', renderViewUser);


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