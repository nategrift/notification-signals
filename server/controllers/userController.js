
const User = require('../models/user')

exports.getUser = async (req, res, next) => {
    let user;

    try {
        user = await User.findByUsername(req.username);

        if (! user) {
            res.status(403);
            throw new Error('Error occurred, unable to get user');
        }
    } catch (err) {
        next(err);
        return;
    }

    res.json({
        ok: true,
        user: user,
    });
};