const logger = require('../utils/logger');

const requestLogger = (req, res, next) => {
	logger.info('Method:', req.method);
	logger.info('Path:', req.path);
	logger.info('Body:', req.body);
	logger.info('---');
	next();
};

const errorHandler = (error, req, res, next) => {
	console.log('errorHandler, error:', error);
	console.log(
		'errorHandler, error.message:',
		error.message
	);
	console.log('errorHandler, error.name:', error.name);

	if (error.name === 'CastError') {
		return res.status(400).send({ error: 'malformed id' });
	}
	if (error.name === 'ValidationError') {
		return res.status(400).send({ error: error.message });
	}

	next(error);
};

const unknownEndpoint = (req, res) => {
	res.status(404).send({ error: 'unknown endpoint' });
};

module.exports = {
	requestLogger,
	unknownEndpoint,
	errorHandler
};
