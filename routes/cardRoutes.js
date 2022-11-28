/* eslint-disable object-curly-newline */
const cardsRouter = require('express').Router();
const { validateCardData, validateCardId } = require('../utils/validators/cardValidator');
const { getCards, addCard, deleteCard, likeCard, dislikeCard } = require('../controllers/cardController');

cardsRouter.get('/', getCards);

cardsRouter.post('/', validateCardData, addCard);

cardsRouter.delete('/:cardId', validateCardId, deleteCard);

cardsRouter.put('/:cardId/likes', validateCardId, likeCard);

cardsRouter.delete('/:cardId/likes', validateCardId, dislikeCard);

module.exports = cardsRouter;
