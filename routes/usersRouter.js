const { Router } = require('express');
const usersRouter = Router();
const usersController = require('../controllers/usersController');
const isAuth = require('./auth').isAuth;

usersRouter.get('/new', usersController.newUserGet);

usersRouter.post('/new', usersController.newUserPost);

usersRouter.get('/user-portal', isAuth, (req, res, next) => {
    res.render('userPortal', { user: req.user });
});

usersRouter.get('/member-signup', isAuth, (req, res, next) => {
    res.render('memberSub');
});

usersRouter.post('/member-signup', usersController.memberSubPost);

usersRouter.get('/end-membership', isAuth, (req, res, next) => { 
    res.render('memberUnsub');
});

usersRouter.post('/end-membership', usersController.memberUnsubPost);

module.exports = usersRouter;