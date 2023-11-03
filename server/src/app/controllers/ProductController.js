class ProductController {
    index(req, res) {
        res.render('user');
    }
}

module.exports = new ProductController();
