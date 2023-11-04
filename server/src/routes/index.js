const userRouter = require('./user');
const { ErrorHandler, NotFound } = require('../app/middlewares/ErrorHandler');

function route(app) {
    app.use('/api/user', userRouter);

    app.use(NotFound);
    app.use(ErrorHandler);
}

module.exports = route;
