const express = require("express");
const router = express.Router();
const multer = require("multer");
const passport = require("passport");

const register = require('../controllers/register/register');
const renderHomePage = require('../controllers/render-home');
const catchAsync = require('../utils/catchAsync');
const renderHome = require('../controllers/render-home');
const renderRegister = require('../controllers/register/render-register');
const { viewStaticClass, viewInteractiveClass, viewAllClasses } = require('../controllers/class/view')
const postLogin = require('../controllers/login/login');




const storage = multer.memoryStorage();
const upload = multer({ storage });


// ==================================================Public Home page========================================================

// Home route
router.get('/', catchAsync(renderHome));


// generic login route
router.get('/login', (req, res) => {
    res.render("login/login");
})
router.post('/login', passport.authenticate("User", { failureFlash: true, failureRedirect: "/login" }), catchAsync(postLogin));


// generic register route
router.get(`/register`, catchAsync(renderRegister));

// view Class
router.get(`/class/static/:classId/view`, catchAsync(viewStaticClass));
router.get(`/class/interactive/:classId/view`, catchAsync(viewInteractiveClass));

// show all interactive classes
router.get('/class/interactive/view/all', catchAsync(viewAllClasses));


module.exports = router;