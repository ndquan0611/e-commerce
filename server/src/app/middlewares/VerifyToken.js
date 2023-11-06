const jwt = require('jsonwebtoken');

module.exports = {
    VerifyAccessToken: async function (req, res, next) {
        // Bearer token
        // headers: { authorization: Bearer token}
        try {
            if (req?.headers?.authorization?.startsWith('Bearer')) {
                const token = req.headers.authorization.split(' ')[1];
                jwt.verify(
                    token,
                    process.env.JWT_SECRET,
                    function (err, decoded) {
                        if (err)
                            return res.json({
                                status: 'Failed',
                                message: 'Invalid access token',
                            });
                        req.user = decoded;
                        next();
                    }
                );
            } else {
                return res.json({
                    status: 'Failed',
                    message: 'Require authentication!',
                });
            }
        } catch (error) {
            next(error);
        }
    },

    IsAdmin: async function (req, res, next) {
        try {
            const { role } = req.user;
            if (role !== 'admin')
                return res.json({
                    status: 'Failed',
                    message: 'Require admin role',
                });

            next();
        } catch (error) {
            next(error);
        }
    },
};
