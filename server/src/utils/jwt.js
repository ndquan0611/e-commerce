const jwt = require('jsonwebtoken');

module.exports = {
    generateAccessToken: function (id, role) {
        return jwt.sign({ _id: id, role }, process.env.JWT_SECRET, {
            expiresIn: '3d',
        });
    },
    generateRefreshToken: function (id) {
        return jwt.sign({ _id: id }, process.env.JWT_SECRET, {
            expiresIn: '7d',
        });
    },
};
