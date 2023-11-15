const express = require('express');
const router = express.Router();

const siteController = require('../app/controllers/SiteController');

router.post('/product-category', siteController.insertProductCategory);
router.post('/product', siteController.insertProduct);

module.exports = router;
