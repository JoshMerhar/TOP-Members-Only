const { Router } = require('express');
const messagesRouter = Router();
const messagesController = require('../controllers/messagesController');
const isAuth = require('./auth').isAuth;

messagesRouter.get('/new', isAuth, (req, res, next) => {
    res.render('newMessage');
});

messagesRouter.post('/new', messagesController.newMessagePost);

messagesRouter.get('/delete/:id', messagesController.messageDeleteGet);

messagesRouter.post('/delete/:id', messagesController.messageDeletePost);

module.exports = messagesRouter;