require('dotenv').config();

const express = require('express');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const { errors } = require('celebrate');
const { cors } = require('./middlewares/cors');
const router = require('./routes/index');
const errorsHandler = require('./utils/errorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { MONGO_BASE_URL, RATE_LIMIT_CONFIG } = require('./utils/constants');

const { PORT = 3000 } = process.env;

const app = express();

app.use(requestLogger);
const limiter = rateLimit(RATE_LIMIT_CONFIG);
app.use(limiter);
app.use(helmet());

app.use(cors);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

mongoose.connect(MONGO_BASE_URL);

app.use(router);

app.use(errorLogger);
app.use(errors());
app.use(errorsHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
