const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../utils/errors/UnauthorizedError');
const { JWT_SECRET } = require('../utils/constants');

const getTokenFromRequest = (req) => {
  if (req.cookies.jwt) {
    return req.cookies.jwt;
  }

  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnauthorizedError('Не авторизован');
  }
  return authorization.replace('Bearer ', '');
};

module.exports = (req, res, next) => {
  const token = getTokenFromRequest(req);

  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    next(new UnauthorizedError('Не авторизован'));
  }

  req.user = payload;
  return next();
};
