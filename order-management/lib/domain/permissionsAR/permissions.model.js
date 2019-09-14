const mongoose = require('mongoose');

const permissionSchema = new mongoose.Schema({
    role: {
        type: String,
        unique: true,
        required: true,
        default: 'admin',
    },
    orders: {
        type: Boolean,
        default: true,
    },
    factory: {
        type: Boolean,
        default: true,
    },
    production: {
        type: Boolean,
        default: true,
    },
    visualization: {
        type: Boolean,
        default: true,
    },
    profile: {
        type: Boolean,
        default: true,
    },
});

module.exports = mongoose.model('Permission', permissionSchema);
