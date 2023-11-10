const Coupon = require('../models/Coupon');

class CouponController {
    // [POST] /api/coupon
    async createCoupon(req, res, next) {
        try {
            const { name, discount, expiry } = req.body;
            if (!name || !discount || !expiry)
                throw new Error('Missing input!');

            const newCoupon = new Coupon({
                ...req.body,
                expiry: Date.now() + +expiry * 24 * 60 * 60 * 1000,
            });
            const coupon = await newCoupon.save();
            return res.json({
                status: 'Ok',
                message: 'Create coupon successfully!',
                data: coupon,
            });
        } catch (error) {
            next(error);
        }
    }

    // [GET] /api/coupon
    async getCoupons(req, res, next) {
        try {
            const response = await Coupon.find().select(
                '-createdAt -updatedAt'
            );
            return res.json({
                status: 'Ok',
                message: 'Get coupon successfully!',
                data: response,
            });
        } catch (error) {
            next(error);
        }
    }

    // [PUT] /api/coupon/:id
    async updateCoupon(req, res, next) {
        try {
            if (Object.keys(req.body).length === 0)
                throw new Error('Missing input!');

            if (req.body.expiry)
                req.body.expiry =
                    Date.now() + +req.body.expiry * 24 * 60 * 60 * 1000;

            const response = await Coupon.findByIdAndUpdate(
                req.params.id,
                req.body,
                { new: true }
            );
            return res.json({
                status: 'Ok',
                message: 'Update coupon successfully!',
                data: response,
            });
        } catch (error) {
            next(error);
        }
    }

    // [DELETE] /api/coupon/:id
    async deleteCoupon(req, res, next) {
        try {
            const response = await Coupon.findByIdAndDelete(req.params.id);
            return res.json({
                status: 'Ok',
                message: 'Delete coupon successfully!',
                data: response,
            });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new CouponController();
