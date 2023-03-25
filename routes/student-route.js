const express = require("express");
const router = express.Router();
const multer = require("multer");

const register = require('../controllers/register/register');
const renderHomePage = require('../controllers/render-home');
const catchAsync = require('../utils/catchAsync');
const { showStudentDashboard } = require('../controllers/dashboard');

const storage = multer.memoryStorage();
const upload = multer({ storage });


// ==================================================Home page========================================================
router.get('/', catchAsync(renderHomePage));

// =================--------------------------Register related routes======================================================
router
  .route("/register")
  // render register form
  .get((req, res) => {
    res.render("register/register-student");
  })
  //   render register data
  .post(catchAsync(register));

router.get('/dashboard', showStudentDashboard);


module.exports = router;