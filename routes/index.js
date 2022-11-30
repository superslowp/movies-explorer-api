const router = require('express').Router();
const usersRouter = require('./userRoutes');
const moviesRouter = require('./movieRoutes');
const { createUser, login, signout } = require('../controllers/userController');
const { validateLogin, validateRegister } = require('../utils/validators/userValidator');
const NotFoundError = require('../utils/errors/NotFoundError');

const auth = require('../middlewares/auth');

router.post('/signup', validateRegister, createUser);
router.post('/signin', validateLogin, login);

router.use(auth);

router.use('/users', usersRouter);
router.use('/movies', moviesRouter);
router.get('/signout', signout);

router.use('*', () => {
  throw new NotFoundError('Неправильный URL');
});

module.exports = router;
