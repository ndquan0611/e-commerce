const express = require('express');
const router = express.Router();

const orderController = require('../app/controllers/OrderController');
const {
    VerifyAccessToken,
    IsAdmin,
} = require('../app/middlewares/VerifyToken');

router.post('/', VerifyAccessToken, orderController.createOrder);
router.get('/', VerifyAccessToken, orderController.getUserOrder);
router.get('/admin', VerifyAccessToken, IsAdmin, orderController.getOrders);
router.put(
    '/status/:id',
    VerifyAccessToken,
    IsAdmin,
    orderController.updateStatus
);

module.exports = router;
