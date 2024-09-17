const { Router } = require('express');
const usersRouter = Router();
const usersController = require('../controllers/usersController');
const db = require('../db/queries');
const isAuth = require('./auth').isAuth;

usersRouter.get('/new', usersController.newUserGet);

usersRouter.post('/new', usersController.newUserPost);

usersRouter.get('/user-portal', isAuth, (req, res, next) => {
    console.log(req.user);
    res.render('userPortal', { user: req.user });
});

usersRouter.post('/user-portal', (req, res, next) => {
    if (!req.user.member_status) {
        db.memberSub(req.user.user_id);
        console.log('Now a member!');
    } else {
        db.memberUnsub(req.user.user_id);
        console.log('No longer a member');
    }
    res.redirect('/users/user-portal');
})

module.exports = usersRouter;