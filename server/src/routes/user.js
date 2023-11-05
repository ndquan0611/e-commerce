const express = require('express');
const router = express.Router();

const userController = require('../app/controllers/UserController');
const { VerifyAccessToken } = require('../app/middlewares/VerifyToken');

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/current', VerifyAccessToken, userController.getCurrent);
router.post('/refreshtoken', userController.refreshAccessToken);
router.get('/logout', userController.logout);

module.exports = router;
