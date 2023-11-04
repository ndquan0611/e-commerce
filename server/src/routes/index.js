const userRouter = require('./user');
const { ErrorHandler, NotFound } = require('../app/middlewares/ErrorHandler');

function route(app) {
    app.use('/api/user', userRouter);

    // Error handling
    app.use(NotFound);
    app.use(ErrorHandler);
}

module.exports = route;
