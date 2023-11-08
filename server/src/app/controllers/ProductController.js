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
            const queries = { ...req.query };
            // Tách các trường đặt biệt ra khỏi query
            const exculeFields = ['limit', 'sort', 'page', 'fields'];
            exculeFields.forEach((item) => delete queries[item]);

            // Format lại các operators cho đúng cú pháp của mongoose
            let queryString = JSON.stringify(queries);
            queryString = queryString.replace(
                /\b(gte|gt|lt|lte)\b/g,
                (macthedEl) => `$${macthedEl}`
            );
            const formatedQueries = JSON.parse(queryString);

            // Filtering
            if (queries?.title)
                formatedQueries.title = {
                    $regex: queries.title,
                    $options: 'i',
                };
            let queryCommand = Product.find(formatedQueries);

            // Sorting
            if (req.query.sort) {
                const sortBy = req.query.sort.split(',').join(' ');
                queryCommand = queryCommand.sort(sortBy);
            }

            // Fields limiting
            if (req.query.fields) {
                const fields = req.query.fields.split(',').join(' ');
                queryCommand = queryCommand.select(fields);
            }

            // Pagination
            // Limit: số object lấy về một lần gọi api
            // Skip:
            const page = +req.query.page || 1;
            const limit = +req.query.limit || process.env.LIMIT_PRODUCTS;
            const skip = (page - 1) * limit;

            queryCommand = queryCommand.skip(skip).limit(limit);

            // Execute query
            // Số lượng sp thỏa mãn điều kiện !== số lượng sp trả về một lần gọi API
            const response = await queryCommand.exec();
            const counts = await Product.find(formatedQueries).countDocuments();

            return res.json({
                status: 'Ok',
                message: 'Found all products',
                counts,
                data: response,
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

    // [PUT] /api/product/ratings
    async ratings(req, res, next) {
        try {
            const { _id } = req.user;
            const { star, comment, id } = req.body;
            if (!star || !id) throw new Error('Missing inputs!');
            const ratingProduct = await Product.findById(id);
            const alreadyRating = ratingProduct?.ratings?.find(
                (rating) => rating.postedBy.toString() === _id
            );

            if (alreadyRating) {
                // Update star & comment
                await Product.updateOne(
                    {
                        ratings: { $elemMatch: alreadyRating },
                    },
                    {
                        $set: {
                            'ratings.$.star': star,
                            'ratings.$.comment': comment,
                        },
                    },
                    {
                        new: true,
                    }
                );
            } else {
                // Add star & comment
                await Product.findByIdAndUpdate(
                    id,
                    {
                        $push: { ratings: { star, comment, postedBy: _id } },
                    },
                    { new: true }
                );
            }

            // Sun ratings
            const updateProduct = await Product.findById(id);
            const ratingCount = updateProduct.ratings.length;
            const sumRating = updateProduct.ratings.reduce(
                (acc, cur) => acc + +cur.star,
                0
            );
            updateProduct.totalRatings =
                Math.round((sumRating * 10) / ratingCount) / 10;
            await updateProduct.save();

            return res.json({
                status: 'Ok',
                data: updateProduct,
            });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new ProductController();
