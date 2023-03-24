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
const { renderAllClasses, addOrRemoveFromHomePage } = require('../controllers/class/class');
const { viewClass } = require('../controllers/class/class');
const { renderViewUser } = require('../controllers/view/view-user');
const { viewSubject } = require("../controllers/subject/subject");
const { viewAllAdmins } = require('../controllers/admin/view');
const { deleteAdmin } = require('../controllers/admin/delete-admin');
const catchAsync = require('../utils/catchAsync');
const { isAdmin } = require('../controllers/role');


// =================--------------------------Check if the client is logged in and admin==============================================
router.use(isLoggedIn, isAdmin);

// =================--------------------------Register related routes======================================================
router
    .route("/add/admin")
    // render register form
    .get((req, res) => {
        res.render("register/register-admin");
    })
    //   render register data
    .post(catchAsync(register));




// ==================================================Home page========================================================
router.get('/', catchAsync(renderHomePage));

// ==================================================Admin Manipulate========================================================
router.get('/view/all-admins', catchAsync(viewAllAdmins));

// Delete Admin
router.get('/:id/delete', catchAsync(deleteAdmin));

// ==================================================Class Related========================================================
router.route('/add-class')
    .get(catchAsync(renderAddClass))
    .post(catchAsync(addClass))

router.get('/all-class', catchAsync(renderAllClasses))

// Add class to homepage
router.get('/class/:classId/home/', catchAsync(addOrRemoveFromHomePage));

router.get('/class/:id/view', catchAsync(viewClass));


// ==================================================Subject Related========================================================
router.get('/class/:classId/subject/:subjectId/view', catchAsync(viewSubject))

// ==================================================Student========================================================
// get student related to particular class
router.get('/get-student/with-grade/:class', catchAsync(getStudentWithGrade))
// render view student
router.get('/student/:id/view', catchAsync(renderViewUser));

// ==================================================Teacher========================================================
// get Teacher related to particular course
router.get('/get-teacher', catchAsync(getTeacherQuery))
// render view Teacher
router.get('/teacher/:id/view', catchAsync(renderViewUser));


module.exports = router;