const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
    {
        products: [
            {
                id: {
                    type: Number,
                },
                quantity: {
                    type: Number,
                    default: 1,
                },
            },
        ],
        deadline: {
            type: String,
            trim: true,
        },
        deliveryAddress: {
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
        status: {
            type: String,
            required: true,
            enum: ['pending', 'delivered', 'canceled'],
            default: 'pending',
        },
        createdBy: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'User',
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Order', orderSchema);
