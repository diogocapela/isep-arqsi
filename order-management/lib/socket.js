const logger = require('./utils/logger');

module.exports = io => {
    const socketsMap = {};

    io.on('connection', socket => {
        // New socket connected
        // =======================================================================
        logger.log(`The socket with ID ${socket.id} just joined the server.`);
        socketsMap[socket.id] = socket;

        // Socket sending data
        // =======================================================================
        socket.on('beneli', data => {
            console.log('beneli');
            console.log(data);
        });

        // Socket disconnected
        // =======================================================================
        socket.on('disconnect', () => {
            delete socketsMap[socket.id];
            logger.log(`The socket with ID ${socket.id} has left the server.`);
        });
    });
};
