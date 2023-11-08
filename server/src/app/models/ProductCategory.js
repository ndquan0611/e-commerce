const mongoose = require('mongoose'); // Erase if already required

const Schema = mongoose.Schema;

// Declare the Schema of the Mongo model
var ProductCategory = new Schema(
    {
        title: {
            type: String,
            required: true,
            unique: true,
            index: true,
        },
    },
    { timestamps: true }
);

//Export the model
module.exports = mongoose.model('ProductCategory', ProductCategory);
