const express = require('express');
require('express-async-errors');
const app = express();
const config = require('./utils/config');
const cors = require('cors');
const blogsRouter = require('./controllers/blogs');
const userRouter = require('./controllers/users');
const middleware = require('./utils/middleware');
const logger = require('./utils/logger');
const mongoose = require('mongoose');

logger.info(`connecting to ${config.MONGODB_URI}`);

mongoose.connect(config.MONGODB_URI, {
	useNewUrlParser    : true,
	useUnifiedTopology : true,
	useFindAndModify   : false,
	useCreateIndex     : true
});

app.use(cors());
app.use(express.json());
app.use(middleware.requestLogger);

app.use('/api/blogs/', blogsRouter);
app.use('/api/users', userRouter);

app.use(middleware.errorHandler);

app.use(middleware.unknownEndpoint);

module.exports = app;
