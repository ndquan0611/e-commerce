const Brand = require('../models/Brand');

class BrandController {
    // [POST] /api/brand/
    async createBrand(req, res, next) {
        try {
            const newBrand = new Brand(req.body);
            const brand = await newBrand.save();

            return res.json({
                status: 'OK',
                message: 'Create brand successfully',
                data: brand,
            });
        } catch (error) {
            next(error);
        }
    }

    // [PUT] /api/brand/:id
    async updateBrand(req, res, next) {
        try {
            const response = await Brand.findByIdAndUpdate(
                req.params.id,
                req.body,
                { new: true }
            );
            return res.json({
                status: 'OK',
                message: 'Update brand successfully',
                data: response,
            });
        } catch (error) {
            next(error);
        }
    }

    // [GET] /api/Brand
    async getBrands(req, res, next) {
        try {
            const response = await Brand.find();

            return res.json({
                status: 'OK',
                message: 'Get brand successfully',
                data: response,
            });
        } catch (error) {
            next(error);
        }
    }

    // [DELETE] /api/brand/:id
    async deleteBrand(req, res, next) {
        try {
            const response = await Brand.findByIdAndDelete(req.params.id);

            return res.json({
                status: 'OK',
                message: 'Delete brand successfully',
                data: response,
            });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new BrandController();
