const mongoose = require('mongoose'); // Erase if already required

const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

// Declare the Schema of the Mongo model
var Order = new Schema(
    {
        products: [
            {
                product: { type: ObjectId, ref: 'Product' },
                count: Number,
                color: String,
            },
        ],
        status: {
            type: String,
            default: 'Proccessing',
            enum: ['Cancelled', 'Proccessing', 'Succeed'],
        },
        total: {
            type: Number,
        },
        coupon: {
            type: ObjectId,
            ref: 'Coupon',
        },
        orderBy: {
            type: ObjectId,
            ref: 'User',
        },
    },
    { timestamps: true }
);

//Export the model
module.exports = mongoose.model('Order', Order);
