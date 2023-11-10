const express = require('express');
const router = express.Router();

const brandController = require('../app/controllers/BrandController');
const {
    VerifyAccessToken,
    IsAdmin,
} = require('../app/middlewares/VerifyToken');

router.post('/', VerifyAccessToken, IsAdmin, brandController.createBrand);
router.get('/', brandController.getBrands);

router.put('/:id', VerifyAccessToken, IsAdmin, brandController.updateBrand);
router.delete('/:id', VerifyAccessToken, IsAdmin, brandController.deleteBrand);

module.exports = router;
