const BlogCategory = require('../models/BlogCategory');

class BlogCategoryController {
    // [POST] /api/blogcategory/
    async createCategory(req, res, next) {
        try {
            const newBlogCategory = new BlogCategory(req.body);
            const blogCategory = await newBlogCategory.save();

            return res.json({
                status: 'OK',
                message: 'Create category successfully',
                data: blogCategory,
            });
        } catch (error) {
            next(error);
        }
    }

    // [PUT] /api/blogcategory/:id
    async updateCategory(req, res, next) {
        try {
            const response = await BlogCategory.findByIdAndUpdate(req.params.id, req.body, { new: true });
            return res.json({
                status: 'OK',
                message: 'Update categories successfully',
                data: response,
            });
        } catch (error) {
            next(error);
        }
    }

    // [GET] /api/blogcategory
    async getCategories(req, res, next) {
        try {
            const response = await BlogCategory.find().select('title _id');

            return res.json({
                status: 'OK',
                message: 'Get categories successfully',
                data: response,
            });
        } catch (error) {
            next(error);
        }
    }

    // [DELETE] /api/blogcategory/:id
    async deleteCategory(req, res, next) {
        try {
            const response = await BlogCategory.findByIdAndDelete(req.params.id);

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

module.exports = new BlogCategoryController();
