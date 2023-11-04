module.exports = {
    NotFound: function (req, res, next) {
        const error = new Error(`Route ${req.originalUrl} not found!`);
        res.status(404);
        next(error);
    },

    ErrorHandler: function (err, req, res, next) {
        const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
        res.status(statusCode).json({
            status: 'Failed',
            message: err.message,
        });
        next();
    },
};
