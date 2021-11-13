
const User = require('../models/user')
const Mail = require('../util/mail')
const jwt = require('jsonwebtoken');

const { validationResult } = require('express-validator');

exports.postLogin = async (req, res, next) => {
    let username = req.body.username;
    let password = req.body.password;

    if (!username || !password) {
        res.status(400);
        next(Error('Please fill out all required fields'));
        return;
    }

    let user;

    // Check username and password to log user in
    try {
        user = await User.getByUsernameAndPassword(username, password);

        if (! user) {
            res.status(403);
            throw new Error('Incorrect Username or Password');
        }
        if (! user.verified) {
            res.status(403);
            throw new Error('Please verify email before logging in.');
        }
    } catch (err) {
        next(err);
        return;
    }

    successResponse(user.username, res);
};

exports.postCreateAccount = async (req, res, next) => {
    let email = req.body.email;
    let username = req.body.username;
    let password = req.body.password;

    const errors = validationResult(req);
    if (! errors.isEmpty()) {
        res.status(400).json({
            ok: false,
            errors: errors.array()
        });
    }

    try {
        // check if user is taken
        const existingUser = await User.findByUsername(username);
        if (existingUser) {
            res.status(403);
            throw new Error('Username taken. Please try a different username');
        }

        let user = new User(username, email);
        user = await user.saveWithPassword(password);

        // send verification email
        const mail = new Mail(email, 'Please Activate your Notification Signal Account', 'verify.html', {
            username: user.username,
            token: user.token,
            host: process.env.PUBLIC_URL
        });

        mail.send()

         // Return token and Username
        res.json({
            ok: true,
            message: `An Email has been sent to ${email}. Please verify before logging in.`,
            username: username,
        });
    } catch (err) {
        return next(err);
    }
};

exports.postVerifyAccount = async (req, res, next) => {
    let email = req.body.email;
    let token = req.body.token;

    const errors = validationResult(req);
    if (! errors.isEmpty()) {
        res.status(400).json({
            ok: false,
            errors: errors.array()
        });
    }

    let user;

    try {
        // check if user exists
        user = await User.findByEmail(email);
        if (! user) {
            res.status(403);
            throw new Error('An Error has occured. Please try again later');
        }

        await user.verify(token);

    } catch (err) {
        return next(err);
    }

    successResponse(user.username, res);
};

function successResponse(username, res) {
    // Create base token
    let token = jwt.sign(
        { username: username },
        process.env.TOKEN_SECRET,
        { expiresIn: '7d' }
    );

    // Return token and Username
    res.json({
        ok: true,
        message: 'Success',
        username: username,
        token: token,
        tokenExpiration: 86400
    });
}