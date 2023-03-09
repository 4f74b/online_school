module.exports = async function(req, res){
    res.render('student/home-page', {currentUser: req.user})
}