const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const User = require('../models/Users');
const {
    generateAccessToken,
    generateRefreshToken,
} = require('../../utils/jwt');
const { sendMail } = require('../../utils/sendMail');

class UserController {
    // [POST] /api/user/register
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

    // [POST] /api/user/login
    async login(req, res, next) {
        // Refresh token => Cấp mới access token
        // Access token => Xác thực người dùng, phân quyền người dùng
        try {
            const { email, password } = req.body;

            // Plain Object
            const response = await User.findOne({ email });
            if (response && (await response.isCorrectPassword(password))) {
                const { password, role, refreshToken, ...userData } =
                    response.toObject();
                // Tạo accessToken and refreshToken
                const accessToken = generateAccessToken(response._id, role);
                const newRefreshToken = generateRefreshToken(response._id);
                // Lưu refreshToken vào database
                await User.findByIdAndUpdate(
                    response._id,
                    { newRefreshToken },
                    { new: true }
                );

                // Lưu refreshToken vào Cookie
                res.cookie('refreshToken', newRefreshToken, {
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

    // [GET] /api/user/current
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

    // [POST] /api/user/refreshtoken
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
                        message: 'Refresh token not matched',
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

    // [GET] /api/user/logout
    async logout(req, res, next) {
        try {
            const cookie = req.cookies;
            if (!cookie || !cookie.refreshToken)
                throw new Error('No refresh token in cookies');
            // Xóa refresh token ở db
            await User.findOneAndDelete(
                {
                    refreshToken: cookie.refreshAccessToken,
                },
                { refreshToken: '' },
                { new: true }
            );
            // Xóa refresh ở cookie
            res.clearCookie('refreshToken', { httpOnly: true, secure: true });

            return res.json({
                status: 'Ok',
                message: 'Logout is done',
            });
        } catch (error) {
            next(error);
        }
    }

    // Client gửi mail
    // Server check mail có hợp lệ hay không => Gửi mail + kèm theo link (password change token)
    // Client check mail -> Click vào link
    // Client gửi api kèm theo token
    // Check xem token có giống với cái token mà server gửi hay không
    // Change password
    // [GET] /api/user/forgotpassword
    async forgotPassword(req, res, next) {
        try {
            const { email } = req.query;
            if (!email) throw new Error('Missing email');
            const user = await User.findOne({ email });
            if (!user) throw new Error('User not found');
            const resetToken = user.createPasswordChangedToken();
            await user.save();

            const html = `Xin vui lòng click vào link dưới đây để thay đổi mặt khẩu của bạn.Link này sẽ hết hạn sau 15 phút kể từ bây giờ. 
            <a href=${process.env.URL_CLIENT}/api/user/reset-password/${resetToken}>Click here</a>`;

            const data = {
                email,
                html,
            };

            const result = await sendMail(data);
            return res.json({
                status: 'OK',
                data: result,
            });
        } catch (error) {
            next(error);
        }
    }

    // [PUT] /api/user/resetpassword
    async resetPassword(req, res, next) {
        try {
            const { password, token } = req.body;
            if (!password || !token) throw new Error('Missing imputs');
            const passwordResetToken = crypto
                .createHash('sha256')
                .update(token)
                .digest('hex');
            const user = await User.findOne({
                passwordResetToken,
                passwordResetExpires: { $gt: Date.now() },
            });
            if (!user) throw new Error('Invalid reset token');

            Object.assign(user, {
                password,
                passwordResetToken: undefined,
                passwordChangedAt: Date.now(),
                passwordResetExpires: undefined,
            });
            await user.save();

            return res.json({
                status: 'Ok',
                message: 'Update password',
            });
        } catch (error) {
            next(error);
        }
    }

    // [GET] /api/user/
    async getUsers(req, res, next) {
        try {
            const response = await User.find().select(
                '-refreshToken -password -role'
            );
            return res.json({
                status: 'OK',
                message: 'List user successfully!',
                data: response,
            });
        } catch (error) {
            next(error);
        }
    }

    // [DELETE] /api/user/
    async destroyUser(req, res, next) {
        try {
            const { _id } = req.query;
            if (!_id) throw new Error('Missing inputs!');
            const response = await User.findByIdAndDelete(_id);
            return res.json({
                status: 'OK',
                message: `User with email ${response.email} deleted`,
            });
        } catch (error) {
            next(error);
        }
    }

    // [PUT] /api/user/current
    async updateUser(req, res, next) {
        try {
            const { _id } = req.user;
            if (!_id || Object.keys(req.body).length === 0)
                throw new Error('Missing inputs!');
            const response = await User.findByIdAndUpdate(_id, req.body, {
                new: true,
            }).select('-password -role');
            return res.json({
                status: 'OK',
                message: 'Update user successfully!',
                data: response,
            });
        } catch (error) {
            next(error);
        }
    }

    // [PUT] /api/user/:id
    async updateUserByAdmin(req, res, next) {
        try {
            const { id } = req.params;
            if (Object.keys(req.body).length === 0)
                throw new Error('Missing inputs');
            const response = await User.findByIdAndUpdate(id, req.body, {
                new: true,
            }).select('-password -role -refreshToken');
            return res.json({
                status: 'OK',
                message: 'Update users successfully!',
                data: response,
            });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new UserController();
