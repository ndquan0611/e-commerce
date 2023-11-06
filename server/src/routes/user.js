const express = require('express');
const router = express.Router();

const userController = require('../app/controllers/UserController');
const {
    VerifyAccessToken,
    IsAdmin,
} = require('../app/middlewares/VerifyToken');

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/current', VerifyAccessToken, userController.getCurrent);
router.post('/refreshtoken', userController.refreshAccessToken);
router.get('/logout', userController.logout);
router.get('/forgotpassword', userController.forgotPassword);
router.put('/resetpassword', userController.resetPassword);
router.get('/', VerifyAccessToken, IsAdmin, userController.getUsers);
router.delete('/', VerifyAccessToken, IsAdmin, userController.destroyUser);
router.put('/current', VerifyAccessToken, userController.updateUser);
router.put(
    '/:id',
    VerifyAccessToken,
    IsAdmin,
    userController.updateUserByAdmin
);

module.exports = router;
