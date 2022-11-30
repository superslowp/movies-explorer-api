const movieModel = require('../models/movie');
const ForbiddenError = require('../utils/errors/ForbiddenError');
const NotFoundError = require('../utils/errors/NotFoundError');

module.exports.getMovies = (req, res, next) => {
  movieModel.find({ owner: req.user._id })
    .then((movies) => res.send(movies))
    .catch(next);
};

module.exports.addMovie = (req, res, next) => {
  const movieObj = req.body;
  movieObj.owner = req.user._id;
  movieModel.create(movieObj)
    .then((movie) => res.send(movie))
    .catch(next);
};

module.exports.deleteMovie = (req, res, next) => {
  const { _id } = req.params;
  movieModel.findById(_id)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError('Фильм с указанным id не найден');
      }
      if (movie.owner.toString() !== req.user._id) {
        throw new ForbiddenError('Невозможно удалить чужой фильм');
      }
      return movieModel.remove(movie)
        .then(() => {
          res.send({ message: 'Фильм удален' });
        })
        .catch(next);
    })
    .catch(next);
};
