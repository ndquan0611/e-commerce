const User = require('../models/Users');

class UserController {
    index(req, res, next) {
        User.find({})
            .then((users) => res.json(users))
            .catch(next);
    }

    // [POST] /register
    async register(req, res, next) {
        const { email } = req.body;

        try {
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                throw new Error('User has existed');
            } else {
                const newUser = new User(req.body);
                const user = await newUser.save();
                res.json({
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
        const { email, password } = req.body;

        try {
            // Plain Object
            const response = await User.findOne({ email });
            if (response && (await response.isCorrectPassword(password))) {
                const { password, role, ...userData } = response.toObject();

                res.json({
                    status: 'Ok',
                    message: 'Login to your account successfully',
                    data: userData,
                });
            } else {
                throw new Error('Invalid credentials');
            }
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new UserController();
