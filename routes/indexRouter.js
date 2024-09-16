const { Router } = require('express');
const indexRouter = Router();
const indexController = require('../controllers/indexController');
const passport = require('passport');
const passportConfig = require('../passport-config');

indexRouter.get('/', indexController.getAllCounts);

indexRouter.get('/login', indexController.getLogin);

indexRouter.post('/login', passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/login"
    })
);

indexRouter.get('/logout', (req, res, next) => {
    req.logout((err) => {
      if (err) {
        return next(err);
      }
      res.redirect("/");
    });
});

module.exports = indexRouter;