/* eslint-disable object-curly-newline */
const movieRouter = require('express').Router();
const { validateMovieData, validateMovieId } = require('../utils/validators/movieValidator');
const { getMovies, addMovie, deleteMovie } = require('../controllers/movieController');

movieRouter.get('/', getMovies);
movieRouter.post('/', validateMovieData, addMovie);
movieRouter.delete('/:_id', validateMovieId, deleteMovie);

module.exports = movieRouter;
