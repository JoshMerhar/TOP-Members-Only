const { Router } = require('express');
const usersRouter = Router();
const usersController = require('../controllers/usersController');
const auth = require('./auth');

usersRouter.get('/new', usersController.newUserGet);

usersRouter.post('/new', usersController.newUserPost);

usersRouter.get('/user-portal', auth.isAuth, (req, res, next) => {
    res.render('userPortal', { user: req.user });
});

usersRouter.get('/member-signup', auth.isAuth, (req, res, next) => {
    res.render('memberSub');
});

usersRouter.post('/member-signup', usersController.memberSubPost);

usersRouter.get('/end-membership', auth.isMember, (req, res, next) => { 
    res.render('memberUnsub');
});

usersRouter.post('/end-membership', usersController.memberUnsubPost);

usersRouter.get('/admin-signup', auth.isMember, (req, res, next) => {
    res.render('adminSub');
});

usersRouter.post('/admin-signup', usersController.adminSubPost);

usersRouter.get('/admin-quit', auth.isAdmin, (req, res, next) => {
    res.render('adminUnsub');
});

usersRouter.post('/admin-quit', usersController.adminUnsubPost);

module.exports = usersRouter;