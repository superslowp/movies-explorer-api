const usersRouter = require('express').Router();

const { updateUser, getUserInfo } = require('../controllers/userController');
const { validateUserInfo } = require('../utils/validators/userValidator');

usersRouter.get('/me', getUserInfo);
usersRouter.patch('/me', validateUserInfo, updateUser);

module.exports = usersRouter;
