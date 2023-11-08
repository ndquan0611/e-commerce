const express = require('express');
const router = express.Router();

const blogController = require('../app/controllers/BlogController');
const {
    VerifyAccessToken,
    IsAdmin,
} = require('../app/middlewares/VerifyToken');

router.post('/', VerifyAccessToken, IsAdmin, blogController.createBlog);
router.get('/', blogController.getBlogs);
router.put('/like', VerifyAccessToken, blogController.likeBlog);

router.put('/:id', VerifyAccessToken, IsAdmin, blogController.updateBlog);

module.exports = router;
