const Product = require('../models/Product');
const slugify = require('slugify');

class ProductController {
    // [POST] /api/product
    async createProduct(req, res, next) {
        try {
            if (Object.keys(req.body).length === 0)
                throw new Error('Missing inputs!');

            if (req.body && req.body.title)
                req.body.slug = slugify(req.body.title);

            const newProduct = new Product(req.body);
            const product = await newProduct.save();
            return res.json({
                status: 'Ok',
                message: 'Create product successfully!',
                data: product,
            });
        } catch (error) {
            next(error);
        }
    }

    // [GET] /api/product/:id
    async getProduct(req, res, next) {
        try {
            const product = await Product.findById(req.params.id);
            return res.json({
                status: 'Ok',
                message: 'Found got product',
                data: product,
            });
        } catch (error) {
            next(error);
        }
    }

    // Filtering, sorting, pagination
    // [GET] /api/product
    async getProducts(req, res, next) {
        try {
            const products = await Product.find();
            return res.json({
                status: 'Ok',
                message: 'Found got all product',
                data: products,
            });
        } catch (error) {
            next(error);
        }
    }

    // [PUT] /api/product/:id
    async updateProduct(req, res, next) {
        try {
            if (req.body && req.body.title)
                req.body.slug = slugify(req.body.title);

            const product = await Product.findByIdAndUpdate(
                req.params.id,
                req.body,
                { new: true }
            );
            return res.json({
                status: product ? 'Ok' : 'Failed',
                message: product
                    ? 'Update product successfully!'
                    : 'Cannot update product!',
                data: product,
            });
        } catch (error) {
            next(error);
        }
    }

    // [DELETE] /api/product/:id
    async deleteProduct(req, res, next) {
        try {
            const product = await Product.findByIdAndDelete(req.params.id);
            return res.json({
                status: product ? 'Ok' : 'Failed',
                message: product
                    ? 'Delete product successfully!'
                    : 'Cannot delete product!',
                data: product,
            });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new ProductController();
