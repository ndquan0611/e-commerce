const express = require('express');
const router = express.Router();

const productCategoryController = require('../app/controllers/ProductCategoryController');
const {
    VerifyAccessToken,
    IsAdmin,
} = require('../app/middlewares/VerifyToken');

router.post(
    '/',
    VerifyAccessToken,
    IsAdmin,
    productCategoryController.createCategory
);
router.get('/', productCategoryController.getCategories);

router.put(
    '/:id',
    VerifyAccessToken,
    IsAdmin,
    productCategoryController.updateCategory
);
router.delete(
    '/:id',
    VerifyAccessToken,
    IsAdmin,
    productCategoryController.deleteCategory
);

module.exports = router;
