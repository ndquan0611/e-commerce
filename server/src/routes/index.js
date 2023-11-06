const userRouter = require('./user');
const productRoute = require('./product');
const { ErrorHandler, NotFound } = require('../app/middlewares/ErrorHandler');

function route(app) {
    app.use('/api/user', userRouter);
    app.use('/api/product', productRoute);

    // Error handling
    app.use(NotFound);
    app.use(ErrorHandler);
}

module.exports = route;
