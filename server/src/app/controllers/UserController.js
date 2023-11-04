const jwt = require('jsonwebtoken');
const User = require('../models/Users');
const {
    generateAccessToken,
    generateRefreshToken,
} = require('../../utils/jwt');

class UserController {
    // [POST] /register
    async register(req, res, next) {
        try {
            const { email } = req.body;

            const existingUser = await User.findOne({ email });
            if (existingUser) {
                throw new Error('User has existed');
            } else {
                const newUser = new User(req.body);
                const user = await newUser.save();
                return res.json({
                    status: 'Ok',
                    message: 'Register user successfully',
                    data: user,
                });
            }
        } catch (error) {
            next(error);
        }
    }

    // [POST] /login
    async login(req, res, next) {
        // Refresh token => Cấp mới access token
        // Access token => Xác thực người dùng, phân quyền người dùng
        try {
            const { email, password } = req.body;

            // Plain Object
            const response = await User.findOne({ email });
            if (response && (await response.isCorrectPassword(password))) {
                const { password, role, ...userData } = response.toObject();
                // Tạo accessToken and refreshToken
                const accessToken = generateAccessToken(response._id, role);
                const refreshToken = generateRefreshToken(response._id);
                // Lưu refreshToken vào database
                await User.findByIdAndUpdate(
                    response._id,
                    { refreshToken },
                    { new: true }
                );

                // Lưu refreshToken vào Cookie
                res.cookie('refreshToken', refreshToken, {
                    maxAge: 7 * 24 * 60 * 60 * 1000,
                    httpOnly: true,
                });

                return res.json({
                    status: 'Ok',
                    message: 'Login to your account successfully',
                    accessToken,
                    data: userData,
                });
            } else {
                throw new Error('Invalid credentials');
            }
        } catch (error) {
            next(error);
        }
    }

    // [GET] /current
    async getCurrent(req, res, next) {
        try {
            const { _id } = req.user;
            const user = await User.findById(_id).select(
                '-refreshToken -password -role'
            );
            return res.json({
                status: 'Ok',
                message: 'Find user account',
                data: user,
            });
        } catch (error) {
            next(error);
        }
    }

    async refreshAccessToken(req, res, next) {
        try {
            // Lấy token từ cookies
            const cookie = req.cookies;
            // Check xem có token hay không
            if (!cookie && !cookie.refreshToken)
                throw new Error('No refresh token in cookies');
            // Check token có hợp lệ hay không
            await jwt.verify(
                cookie.refreshToken,
                process.env.JWT_SECRET,
                async function (err, decode) {
                    if (err) throw new Error('Invalid refresh token');
                    const response = await User.findOne({
                        _id: decode._id,
                        refreshToken: cookie.refreshToken,
                    });
                    return res.json({
                        status: 'Ok',
                        message: 'Token valid',
                        newAccessToken: generateAccessToken(
                            response._id,
                            response.role
                        ),
                    });
                }
            );
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new UserController();
