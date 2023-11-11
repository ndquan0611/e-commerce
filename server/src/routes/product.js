const express = require('express');
const router = express.Router();
const uploader = require('../config/cloudinary.config');

const productController = require('../app/controllers/ProductController');
const {
    VerifyAccessToken,
    IsAdmin,
} = require('../app/middlewares/VerifyToken');

router.post('/', VerifyAccessToken, IsAdmin, productController.createProduct);
router.get('/', productController.getProducts);
router.put('/ratings', VerifyAccessToken, productController.ratings);

router.put(
    '/uploadimage/:id',
    VerifyAccessToken,
    IsAdmin,
    uploader.single('images'),
    productController.uploadImagesProduct
);
router.get('/:id', productController.getProduct);
router.put('/:id', VerifyAccessToken, IsAdmin, productController.updateProduct);
router.delete(
    '/:id',
    VerifyAccessToken,
    IsAdmin,
    productController.deleteProduct
);

module.exports = router;
