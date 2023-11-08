const mongoose = require('mongoose'); // Erase if already required

const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

// Declare the Schema of the Mongo model
var Blog = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            required: true,
        },
        numberView: {
            type: Number,
            default: 0,
        },
        likes: [
            {
                type: ObjectId,
                ref: 'User',
            },
        ],
        dislikes: [
            {
                type: ObjectId,
                ref: 'User',
            },
        ],
        image: {
            type: String,
            default:
                'https://images.unsplash.com/photo-1432821596592-e2c18b78144f?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YmxvZ3xlbnwwfHwwfHx8MA%3D%3D',
        },
        author: {
            type: String,
            default: 'Admin',
        },
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);

//Export the model
module.exports = mongoose.model('Blog', Blog);
