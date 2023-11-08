const ProductCategory = require('../models/ProductCategory');

class ProductCategoryController {
    // [POST] /api/productcategory/
    async createCategory(req, res, next) {
        try {
            const newProductCategory = new ProductCategory(req.body);
            const productCategory = await newProductCategory.save();

            return res.json({
                status: 'OK',
                message: 'Create category successfully',
                data: productCategory,
            });
        } catch (error) {
            next(error);
        }
    }

    // [PUT] /api/productcategory/:id
    async updateCategory(req, res, next) {
        try {
            const response = await ProductCategory.findByIdAndUpdate(
                req.params.id,
                req.body,
                { new: true }
            );
            return res.json({
                status: 'OK',
                message: 'Update categories successfully',
                data: response,
            });
        } catch (error) {
            next(error);
        }
    }

    // [GET] /api/productcategory
    async getCategories(req, res, next) {
        try {
            const response = await ProductCategory.find().select('title _id');

            return res.json({
                status: 'OK',
                message: 'Get categories successfully',
                data: response,
            });
        } catch (error) {
            next(error);
        }
    }

    // [DELETE] /api/productcategory/:id
    async deleteCategory(req, res, next) {
        try {
            const response = await ProductCategory.findByIdAndDelete(
                req.params.id
            );

            return res.json({
                status: 'OK',
                message: 'Delete categories successfully',
                data: response,
            });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new ProductCategoryController();
