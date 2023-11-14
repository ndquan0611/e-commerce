const Order = require('../models/Order');
const User = require('../models/User');
const Coupon = require('../models/Coupon');

class OrderController {
    async createOrder(req, res, next) {
        try {
            const { _id } = req.user;
            const { coupon } = req.body;
            const userCar = await User.findById(_id)
                .select('cart')
                .populate('cart.product', 'title price');

            const products = userCar?.cart?.map((e) => ({
                product: e.product._id,
                count: e.quantity,
                color: e.color,
            }));

            let total = userCar?.cart?.reduce(
                (acc, cur) => cur.product.price * cur.quantity + acc,
                0
            );

            const createData = { products, total, orderBy: _id };
            if (coupon) {
                const selectedCoupon = await Coupon.findById(coupon);
                total =
                    Math.round(
                        (total * (1 - +selectedCoupon?.discount / 100)) / 1000
                    ) * 1000 || total;
                createData.total = total;
                createData.coupon = coupon;
            }

            const order = await Order.create(createData);
            return res.json({
                status: 'OK',
                data: order,
            });
        } catch (error) {
            next(error);
        }
    }

    async updateStatus(req, res, next) {
        try {
            const { id } = req.params;
            const { status } = req.body;
            if (!status) throw new Error('Missing status!');
            const response = await Order.findByIdAndUpdate(
                id,
                { status },
                { new: true }
            );

            return res.json({
                status: response ? 'OK' : 'Failed',
                data: response,
            });
        } catch (error) {
            next(error);
        }
    }

    async getUserOrder(req, res, next) {
        try {
            const { _id } = req.user;
            const response = await Order.find({ orderBy: _id });

            return res.json({
                status: response ? 'OK' : 'Failed',
                data: response,
            });
        } catch (error) {
            next(error);
        }
    }

    async getOrders(req, res, next) {
        try {
            const response = await Order.find();

            return res.json({
                status: response ? 'OK' : 'Failed',
                data: response,
            });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new OrderController();
