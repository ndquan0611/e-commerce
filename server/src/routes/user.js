const express = require('express');
const router = express.Router();

const userController = require('../app/controllers/UserController');
const { VerifyAccessToken } = require('../app/middlewares/VerifyToken');

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/current', VerifyAccessToken, userController.getCurrent);

module.exports = router;
