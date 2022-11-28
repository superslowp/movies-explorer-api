const router = require('express').Router();
const usersRouter = require('./userRoutes');
const moviesRouter = require('./movieRoutes');
const { createUser, login, logout } = require('../controllers/userController');
const { validateLogin, validateRegister } = require('../utils/validators/userValidator');
const NotFoundError = require('../utils/errors/NotFoundError');

const auth = require('../middlewares/auth');

router.post('/signup', validateRegister, createUser);
router.post('/signin', validateLogin, login);
router.use('/users', auth, usersRouter);
router.use('/movies', auth, moviesRouter);
router.get('/logout', logout);
router.use('*', () => {
  throw new NotFoundError('Неправильный URL');
});

module.exports = router;
