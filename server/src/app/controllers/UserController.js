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
                res.json({ message: 'Successfully', user });
            })
            .catch(next);
    }
}

module.exports = new UserController();
