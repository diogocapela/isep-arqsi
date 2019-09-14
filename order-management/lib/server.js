const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const http = require('http');
const morgan = require('morgan');
const socketIO = require('socket.io');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const socket = require('./socket');
const router = require('./router');
const logger = require('./utils/logger');
const { connect } = require('./config/mongoose');
require('./config/env-setup');

const app = express();
const socketServer = http.createServer(app);
const io = socketIO(socketServer);
socket(io);
global._io = io;

app.set('port', process.env.PORT || 3000);
app.disable('x-powered-by');
app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(router);

const options = {
    definition: {
        openapi: '3.0.0', // Specification (optional, defaults to swagger: '2.0')
        info: {
            title: 'Orders Management API', // Title (required)
            version: '1.0.0', // Version (required)
        },
    },
    // Path to the API docs
    apis: ['./application/*/*.controller.js'],
};

// Initialize swagger-jsdoc -> returns validated swagger spec in json format
const swaggerSpec = swaggerJSDoc(options);

router.use('/swagger', swaggerUi.serve);
router.get('/swagger', swaggerUi.setup(swaggerSpec));

(async () => {
    try {
        await connect();
    } catch (error) {
        logger.error(error);
    }
})();

const port = app.get('port');
const env = app.get('env');

const server = socketServer.listen(port, 'localhost', () => {
    logger.log(
        `The server is now running at http://localhost:${port} in ${env} mode.`
    );
    logger.log('Press CTRL-C to stop.\n');
});

module.exports = { app, server, io };
