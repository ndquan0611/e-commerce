const express = require('express');
const router = express.Router();
const uploader = require('../config/cloudinary.config');

const blogController = require('../app/controllers/BlogController');
const {
    VerifyAccessToken,
    IsAdmin,
} = require('../app/middlewares/VerifyToken');

router.post('/', VerifyAccessToken, IsAdmin, blogController.createBlog);
router.get('/', blogController.getBlogs);

router.put(
    '/uploadimage/:id',
    VerifyAccessToken,
    IsAdmin,
    uploader.single('image'),
    blogController.uploadImageBlog
);
router.put('/like/:id', VerifyAccessToken, blogController.likeBlog);
router.put('/dislike/:id', VerifyAccessToken, blogController.dislikeBlog);
router.get('/:id', blogController.getBlog);
router.put('/:id', VerifyAccessToken, IsAdmin, blogController.updateBlog);
router.delete('/:id', VerifyAccessToken, IsAdmin, blogController.deleteBlog);

module.exports = router;
