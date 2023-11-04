const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

var User = new Schema(
    {
        firstname: {
            type: String,
            required: true,
        },
        lastname: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        mobile: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            default: 'user',
        },
        cart: {
            type: Array,
            default: [],
        },
        address: [{ type: ObjectId, ref: 'Address' }],
        wishlist: [{ type: ObjectId, ref: 'Product' }],
        isBlocked: {
            type: Boolean,
            default: false,
        },
        refreshToken: {
            type: String,
        },
        passwordChangedAt: {
            type: String,
        },
        passwordResetToken: {
            type: String,
        },
        passwordResetExpires: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

// Hash a password
User.pre('save', async function (next) {
    if (this.isModified('password')) {
        const saltRounds = 10;
        const salt = bcrypt.genSaltSync(saltRounds);
        this.password = bcrypt.hashSync(this.password, salt);
    } else {
        next();
    }
});

User.methods = {
    isCorrectPassword: async function (password) {
        return await bcrypt.compare(password, this.password);
    },
};

//Export the model
module.exports = mongoose.model('User', User);