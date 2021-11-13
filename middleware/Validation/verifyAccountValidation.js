const express = require('express');

const router = express.Router();

const { body } = require('express-validator');

router.use(
    body('email')
        .isEmail()
        .withMessage('must be a valid email'),
    body('token')
        .isLength(36)
        .withMessage('must be a valid token'),
);

module.exports = router;
