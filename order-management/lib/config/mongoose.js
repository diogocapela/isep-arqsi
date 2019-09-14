const mongoose = require('mongoose');
const logger = require('../utils/logger');

mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.set('useCreateIndex', true);

module.exports = {
    connect: () => {
        return mongoose
            .connect(process.env.MONGO_DB_URI)
            .then(() => {
                logger.log('Successfully connected to MongoDB!');
            })
            .catch(error => {
                logger.error('There was an error connecting to MongoDB!');
                logger.error(error);
            });
    },
    drop: () => {
        mongoose.connection.dropCollection('orders');
        mongoose.connection.dropCollection('users');
    },
};
