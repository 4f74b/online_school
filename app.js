const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const ejs = require('ejs');
const ejsMate = require('ejs-mate');
const path = require('path');
const session = require('express-session');
// const bodyParser = require("body-parser");
const passport = require("passport");
const flash = require("connect-flash");
const cors = require("cors");
const dotEnv = require("dotenv");


const studentRoute = require('./routes/student-route');
const teacherRoute = require('./routes/teacher-route');
const adminRoute = require('./routes/admin-route');
// const zoomRouter = require("./routes/zoom-route");


const configurePassport = require('./controllers/passport/configure-passport');
const postLogin = require('./controllers/login/login');
const renderHome = require('./controllers/render-home');
const renderRegister = require('./controllers/register/render-register')
const { viewStaticClass, viewInteractiveClass } = require('./controllers/class/view')
const { getPageGeneralInfo } = require('./controllers/get-page-general-info');
const catchAsync = require('./utils/catchAsync');
const ExpressError = require('./utils/ExpressError');

// load environment vairables
dotEnv.config();
const app = express();
const port = process.env.PORT || 443;



//registering middlewares
// app.use(cors());


//registering routes
// app.use("/zoomapi", zoomRouter);


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(bodyParser({ limit: "50mb" }));


app.engine("ejs", ejsMate);
app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "ejs");


app.use(express.static(path.join(__dirname, "./public")));

app.listen(3000, () => {
    console.log("Server started on port" + port);
});

// mongoose.connect("mongodb://0.0.0.0:27017/online-school", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// });
const mongoUrl = process.env.MONGOURL

mongoose.connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

//the following will check for a successfull connection to mongodb, The above commented code can also be used
const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error"));
db.once("open", () => {
    console.log("database connected");
});

path.join(__dirname, "/views");

// Configure session
const sessionOptions = {
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
};
app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

// configure passport
app.use(configurePassport);

app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    next();
});

// add currently logged in user to res.locals
app.use((req, res, next) => {
    res.locals.currentUser = undefined;
    if (req.user) {
        res.locals.currentUser = req.user;
    }
    next();
});

// add current url and domain name to res.locals
app.use((req, res, next) => {
    res.locals.currentUrl = req.originalUrl;
    res.locals.domainName = process.env.DOMAIN_NAME;
    next();
});
// ====================================================Routes start here=====================================

// Fill general Information about page
app.use(catchAsync(async (req, res, next) => {
    res.locals.pageInfo = await getPageGeneralInfo(req, res);
    next();
}))

// Home route
app.get('/', catchAsync(renderHome));


// generic login route
app.get('/login', (req, res) => {
    res.render("login/login");
})
// generic register route
app.get(`/register`, renderRegister);

// view Class
app.get(`/class/static/:classId/view`, viewStaticClass);
app.get(`/class/iteractive/:classId/view`, viewStaticClass);

app.post('/login', passport.authenticate("User", { failureFlash: true, failureRedirect: "/login" }), postLogin);

// student routes
app.use('/student', studentRoute);

// teacher routes
app.use('/teacher', teacherRoute);

// admin routes
app.use('/admin', adminRoute);






// ======================================================Routes end here====================================

// The following route will respond if and only if the requested path and method do not match the above specified ones
app.all("*", (req, res, next) => {
    throw new ExpressError(404, "page not found");
});

// The following is our custom error handler
app.use((err, req, res, next) => {
    const { status = 500 } = err;
    if (!err.message) err.message = "Something went wrong";
    res.status(status).render("error/error", { err });
});