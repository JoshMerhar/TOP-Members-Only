const express = require('express');
const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);
const passport = require('passport');
const createError = require('http-errors');
const path = require('node:path');
const cookieParser = require('cookie-parser');
const pool = require('./db/pool');
const indexRouter = require('./routes/indexRouter');
const usersRouter = require('./routes/usersRouter');
const messagesRouter = require('./routes/messagesRouter');
require('dotenv').config();

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Remove this line after adding a favicon
app.use('/favicon.ico', (req, res) => res.status(204).end());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(session({
    store: new pgSession({
        pool: pool,
        tableName: 'session'
    }),
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 // 1 day
    }
}));

app.use(passport.session());

const assetsPath = path.join(__dirname, 'public');
app.use(express.static(assetsPath));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/messages', messagesRouter);

app.use(function(req, res, next) {
    next(createError(404));
});

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    next();
});  

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // render the error page
    console.log(res.locals.error);
    res.status(err.status || 500);
    res.render('error', { error: err });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Express app listening on port ${PORT}!`));