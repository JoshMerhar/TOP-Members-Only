const { Router } = require('express');
const messagesRouter = Router();
const messagesController = require('../controllers/messagesController');
const isAuth = require('./auth').isAuth;

messagesRouter.get('/', messagesController.showAllMessages);

messagesRouter.get('/new', isAuth, (req, res, next) => {
    res.render('newMessage');
});

messagesRouter.post('/new', messagesController.newMessagePost);

module.exports = messagesRouter;