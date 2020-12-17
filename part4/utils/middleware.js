const logger = require('../utils/logger');

const requestLogger = (req, res, next) => {
	logger.info('Method:', req.method);
	logger.info('Path:', req.path);
	logger.info('Body:', req.body);
	logger.info('---');
	next();
};

const tokenExtractor = (request, response, next) => {
	const authorization = request.get('authorization');
	// console.log('authorization', authorization);
	if (
		authorization &&
		authorization.toLowerCase().startsWith('bearer')
	) {
		request.token = authorization.substring(7);
	} else {
		request.token = null;
	}

	next();
};

const errorHandler = (error, req, res, next) => {
	// console.log('errorHandler, error:', error);
	// console.log(
	// 	'errorHandler, error.message:',
	// 	error.message
	// );
	// console.log('errorHandler, error.name:', error.name);

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
	tokenExtractor,
	unknownEndpoint,
	errorHandler
};
