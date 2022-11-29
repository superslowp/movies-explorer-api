const { NODE_ENV, JWT_PROD_SECRET, MONGO_URL } = process.env;

module.exports.JWT_SECRET = NODE_ENV === 'production' ? JWT_PROD_SECRET : '370b31ea-bcf5-4a13-a3ca-80085361703e';

module.exports.MONGO_BASE_URL = NODE_ENV === 'production' ? MONGO_URL : 'mongodb://localhost:27017/moviesdb';

module.exports.LINK_REGEXP = /(https?:\/\/)(w{3}\.)?(((\d{1,3}\.){3}\d{1,3})|((\w-?)+\.(ru|com)))(:\d{2,5})?((\/.+)+)?\/?#?/;

module.exports.RATE_LIMIT_CONFIG = {
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
};
