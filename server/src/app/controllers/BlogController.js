const Blog = require('../models/Blog');

class BlogController {
    // [POST] /api/blog
    async createBlog(req, res, next) {
        try {
            const newBlog = new Blog(req.body);
            const blog = await newBlog.save();
            return res.json({
                status: 'Ok',
                message: 'Create blog successfully!',
                data: blog,
            });
        } catch (error) {
            next(error);
        }
    }

    // [PUT] /api/blog/:id
    async updateBlog(req, res, next) {
        try {
            if (Object.keys(req.body).length === 0)
                throw new Error('Missing input!');
            const response = await Blog.findByIdAndUpdate(
                req.params.id,
                req.body,
                { new: true }
            );
            return res.json({
                status: 'Ok',
                message: 'Update blog successfully!',
                data: response,
            });
        } catch (error) {
            next(error);
        }
    }

    // [GET] /api/blog
    async getBlogs(req, res, next) {
        try {
            const response = await Blog.find();
            return res.json({
                status: 'Ok',
                message: 'Get blog successfully!',
                data: response,
            });
        } catch (error) {
            next(error);
        }
    }

    // [PUT] /api/blog/like
    // Khi người dùng like vào blog
    // 1. Check xem người dùng trước đó có dislike hay ko => bỏ dislike
    // 2. Check xem người đó trước đó có like hay ko => bỏ like / thêm like
    async likeBlog(req, res, next) {
        try {
            const { _id } = req.user;
            const { id } = req.params;
            if (!id) throw new Error('Missing input!');
            const blog = await Blog.findById(id);
            const alreadyDisliked = blog.dislikes.find(
                (e) => e.toString() === _id
            );
            if (alreadyDisliked) {
                const response = await Blog.findByIdAndUpdate(
                    id,
                    {
                        $pull: { dislikes: _id },
                    },
                    { new: true }
                );
                return res.json({
                    status: response ? 'OK' : 'Failed',
                    data: response,
                });
            }
            const isLiked = blog.likes.find((e) => e.toString() === _id);
            if (isLiked) {
                const response = await Blog.findByIdAndUpdate(
                    id,
                    {
                        $pull: { likes: _id },
                    },
                    { new: true }
                );
                return res.json({
                    status: response ? 'OK' : 'Failed',
                    data: response,
                });
            } else {
                const response = await Blog.findByIdAndUpdate(
                    id,
                    {
                        $push: { likes: _id },
                    },
                    { new: true }
                );
                return res.json({
                    status: response ? 'OK' : 'Failed',
                    data: response,
                });
            }
        } catch (error) {
            next(error);
        }
    }

    // [PUT] /api/blog/dislike
    async dislikeBlog(req, res, next) {
        try {
            const { _id } = req.user;
            const { id } = req.params;
            if (!id) throw new Error('Missing input!');
            const blog = await Blog.findById(id);
            const alreadyLiked = blog.likes.find((e) => e.toString() === _id);
            if (alreadyLiked) {
                const response = await Blog.findByIdAndUpdate(
                    id,
                    {
                        $pull: { likes: _id },
                    },
                    { new: true }
                );
                return res.json({
                    status: response ? 'OK' : 'Failed',
                    data: response,
                });
            }
            const isDisliked = blog.dislikes.find((e) => e.toString() === _id);
            if (isDisliked) {
                const response = await Blog.findByIdAndUpdate(
                    id,
                    {
                        $pull: { dislikes: _id },
                    },
                    { new: true }
                );
                return res.json({
                    status: response ? 'OK' : 'Failed',
                    data: response,
                });
            } else {
                const response = await Blog.findByIdAndUpdate(
                    id,
                    {
                        $push: { dislikes: _id },
                    },
                    { new: true }
                );
                return res.json({
                    status: response ? 'OK' : 'Failed',
                    data: response,
                });
            }
        } catch (error) {
            next(error);
        }
    }

    // [GET] /api/blog/:id
    async getBlog(req, res, next) {
        try {
            const blog = await Blog.findByIdAndUpdate(
                req.params.id,
                {
                    $inc: { numberView: 1 },
                },
                { new: true }
            )
                .populate('likes', 'firstname lastname')
                .populate('dislikes', 'firstname lastname');
            return res.json({
                status: blog ? 'OK' : 'Failed',
                data: blog,
            });
        } catch (error) {
            next(error);
        }
    }

    // [DELETE] /api/blog
    async deleteBlog(req, res, next) {
        try {
            const blog = await Blog.findByIdAndDelete(req.params.id);
            return res.json({
                status: 'OK',
                message: 'Delete blog successfully',
                data: blog,
            });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new BlogController();
