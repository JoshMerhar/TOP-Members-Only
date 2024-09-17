module.exports.isAuth = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.status(401);
        res.render('notAuthorized');
    }
}

module.exports.isAdmin = (req, res, next) => {

}