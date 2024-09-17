const { Router } = require('express');
const indexRouter = Router();
const indexController = require('../controllers/indexController');
const passport = require('passport');
require('../passport-config');

indexRouter.get('/', indexController.getAllCounts);

indexRouter.get('/login', indexController.getLogin);

indexRouter.post('/login', passport.authenticate("local", {
        successRedirect: "/users/user-portal",
        failureRedirect: "/login"
    })
);

indexRouter.get('/logout', (req, res, next) => {
    req.logout((err) => {
      if (err) {
        return next(err);
      }
      console.log('Logged out.')
      res.redirect("/");
    });
});

module.exports = indexRouter;