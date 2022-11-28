const { Joi, celebrate } = require('celebrate');
const { LINK_REGEXP } = require('../constants');

module.exports.validateMovieData = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required().min(3).max(40),
    director: Joi.string().required().min(3).max(60),
    duration: Joi.number().required(),
    year: Joi.string().required().min(4).max(4),
    description: Joi.string().required(),
    image: Joi.string().required().pattern(LINK_REGEXP),
    trailerLink: Joi.string().required().pattern(LINK_REGEXP),
    thumbnail: Joi.string().required().pattern(LINK_REGEXP),
    movieId: Joi.string().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

module.exports.validateMovieId = celebrate({
  params: Joi.object().keys({
    _id: Joi.string().required().hex().length(24),
  }),
});
