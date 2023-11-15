const userRouter = require('./user');
const productRouter = require('./product');
const productCategoryRouter = require('./productCategory');
const blogRouter = require('./blog');
const blogCategoryRouter = require('./blogCategory');
const brandRouter = require('./brand');
const couponRouter = require('./coupon');
const orderRouter = require('./order');
const siteRouter = require('./site');
const { ErrorHandler, NotFound } = require('../app/middlewares/ErrorHandler');

function route(app) {
    app.use('/api/user', userRouter);
    app.use('/api/product', productRouter);
    app.use('/api/productcategory', productCategoryRouter);
    app.use('/api/blog', blogRouter);
    app.use('/api/blogcategory', blogCategoryRouter);
    app.use('/api/brand', brandRouter);
    app.use('/api/coupon', couponRouter);
    app.use('/api/order', orderRouter);
    app.use('/api/site/insert', siteRouter);

    // Error handling
    app.use(NotFound);
    app.use(ErrorHandler);
}

module.exports = route;
