
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

    successResponse(user, res);
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
            res.json({
                ok: false,
                errors: [
                    {
                        param: "username",
                        msg: "Username taken, please try again."
                    }
                ],
            });
        }

        if (process.env.NODE_ENV == 'production') {

            const {user, token} = await User.createAndSaveWithVerification(username, email, password);

            // send verification email
            const mail = new Mail(email, 'Please Activate your Notification Signal Account', 'verify.html', {
                username: user.username,
                token: token,
                email: user.email,
                host: process.env.PUBLIC_URL
            });

            mail.send()


            successResponse(user, res, `An Email has been sent to ${email}. Please verify before logging in.`)
        } else {
            const user = await User.createAndSave(username, email, password);

            successResponse(user, res, `DEV: Verified account has been created.`)
        }

    } catch (err) {
        return next(err);
    }
};

exports.getVerifyAccount = async (req, res, next) => {
    let email = req.query.email;
    let token = req.query.token;

    let user;

    try {
        if (!token || token.length != 36) {
            res.status(400);
            throw new Error('Please provide a valid token.')
        }

        if (!email || !email.includes("@") || email.length < 4) {
            res.status(400);
            throw new Error('Please provide a valid email.')
        }
        // check if user exists
        user = await User.findByEmail(email);
        if (! user) {
            res.status(403);
            throw new Error('This account has not been registered. Please create an account first.');
        }

        await user.verify(token);

    } catch (err) {
        return next(err);
    }

    res.json({
        ok: true,
        message: `Account with email ${email} has been verified. Please log in.`,
    });
};

function successResponse(user, res, message="Success") {
    // Create base token
    let token = jwt.sign(
        { username: user.username, id: user.id },
        process.env.TOKEN_SECRET,
        { expiresIn: '7d' }
    );

    // Return token and Username
    res.json({
        ok: true,
        message: message,
        user: user,
        token: token,
        expireIn: 604800000 // 7 days in milliseconds
    });
}