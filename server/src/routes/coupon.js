const express = require('express');
const router = express.Router();

const couponController = require('../app/controllers/CouponController');
const {
    VerifyAccessToken,
    IsAdmin,
} = require('../app/middlewares/VerifyToken');

router.post('/', VerifyAccessToken, IsAdmin, couponController.createCoupon);
router.get('/', couponController.getCoupons);
router.put('/:id', VerifyAccessToken, IsAdmin, couponController.updateCoupon);
router.delete(
    '/:id',
    VerifyAccessToken,
    IsAdmin,
    couponController.deleteCoupon
);

module.exports = router;
