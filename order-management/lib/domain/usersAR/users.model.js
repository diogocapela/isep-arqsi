/* eslint-disable consistent-return */
/* eslint-disable func-names */
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            unique: true,
            required: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            required: true,
            enum: ['client', 'gestor', 'admin'],
            default: 'client',
        },
        firstName: {
            type: String,
            trim: true,
        },
        lastName: {
            type: String,
            trim: true,
        },
        address: {
            street: {
                type: String,
                trim: true,
            },
            zipCode: {
                type: String,
                trim: true,
            },
            city: {
                type: String,
                trim: true,
            },
            country: {
                type: String,
                trim: true,
            },
        },
        settings: {
            acceptsMarketing: {
                type: Boolean,
                required: true,
                default: false,
            },
        },
        priority: {
            type: Number,
            max: 5,
            min: 1,
            required: true,
            default: 3,
        },
    },
    { timestamps: true }
);

/*
userSchema.pre('save', function(next) {
    if (!this.isModified('password')) {
        return next();
    }

    bcrypt.hash(this.password, 8, (err, hash) => {
        if (err) {
            return next(err);
        }

        this.password = hash;
        next();
    });
});

userSchema.methods.checkPassword = function(password) {
    const passwordHash = this.password;
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, passwordHash, (err, same) => {
            if (err) {
                return reject(err);
            }

            resolve(same);
        });
    });
};
*/

module.exports = mongoose.model('User', userSchema);
