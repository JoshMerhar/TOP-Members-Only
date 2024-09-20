const isAuth = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.status(401);
        res.render('notAuthorized', { authLevel: 'logged in' });
    }
}

const isMember = (req, res, next) => {
    if (req.user.member_status) {
        next();
    } else {
        res.status(401);
        res.render('notAuthorized', { authLevel: 'a member' });
    }
}

const isAdmin = (req, res, next) => {
    if (req.user.admin_status) {
        next();
    } else {
        res.status(401);
        res.render('notAuthorized', { authLevel: 'an admin' });
    }
}

module.exports = {
    isAuth,
    isMember,
    isAdmin
};