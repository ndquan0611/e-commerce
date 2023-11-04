const User = require('../models/Users');

class UserController {
    index(req, res, next) {
        User.find({})
            .then((users) => res.json(users))
            .catch(next);
    }

    // [POST] /register
    register(req, res, next) {
        const user = new User(req.body);
        user.save()
            .then(() => {
                res.json({
                    status: 'OK',
                    message: 'Insert User successfully',
                    data: user,
                });
            })
            .catch(next);
    }
}

module.exports = new UserController();
