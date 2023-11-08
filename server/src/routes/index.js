const userRouter = require('./user');
const productRouter = require('./product');
const productCategoryRouter = require('./productCategory');
const blogCategoryRouter = require('./blogCategory');
const { ErrorHandler, NotFound } = require('../app/middlewares/ErrorHandler');

function route(app) {
    app.use('/api/user', userRouter);
    app.use('/api/product', productRouter);
    app.use('/api/productcategory', productCategoryRouter);
    app.use('/api/blogcategory', blogCategoryRouter);

    // Error handling
    app.use(NotFound);
    app.use(ErrorHandler);
}

module.exports = route;
