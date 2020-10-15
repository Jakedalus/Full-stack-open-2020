const http = require('http');
const express = require('express');
const app = express();
const config = require('./utils/config');
const cors = require('cors');
const blogsRouter = require('./controllers/blogs');
const logger = require('./utils/logger');

app.use('/api/blogs/', blogsRouter);

app.use(cors());
app.use(express.json());

app.listen(config.PORT, () => {
	logger.info(`Server running on port ${config.PORT}`);
});
