const mongoose = require('mongoose'); // Erase if already required

const Schema = mongoose.Schema;

// Declare the Schema of the Mongo model
var Coupon = new Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            uppercase: true,
        },
        discount: {
            type: Number,
            required: true,
        },
        expiry: {
            type: Date,
            required: true,
        },
    },
    { timestamps: true }
);

//Export the model
module.exports = mongoose.model('Coupon', Coupon);
