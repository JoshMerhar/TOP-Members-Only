const { Router } = require('express');
const usersRouter = Router();
const usersController = require('../controllers/usersController');

usersRouter.get('/new', usersController.newUserGet);

usersRouter.post('/new', usersController.newUserPost);

module.exports = usersRouter;