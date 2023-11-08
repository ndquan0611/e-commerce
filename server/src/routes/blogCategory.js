const express = require('express');
const router = express.Router();

const blogCategoryController = require('../app/controllers/BlogCategoryController');
const {
    VerifyAccessToken,
    IsAdmin,
} = require('../app/middlewares/VerifyToken');

router.post(
    '/',
    VerifyAccessToken,
    IsAdmin,
    blogCategoryController.createCategory
);
router.get('/', blogCategoryController.getCategories);

router.put(
    '/:id',
    VerifyAccessToken,
    IsAdmin,
    blogCategoryController.updateCategory
);
router.delete(
    '/:id',
    VerifyAccessToken,
    IsAdmin,
    blogCategoryController.deleteCategory
);

module.exports = router;
