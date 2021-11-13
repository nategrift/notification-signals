const express = require('express');

const router = express.Router();

const { body } = require('express-validator');

router.use(
    body('email')
        .isEmail()
        .withMessage('must be a valid email'),
    body('password')
        .isLength({ min: 5 })
        .withMessage('must be at least 8 chars long')
        .matches(/\d/)
        .withMessage('must contain a number'),
    body('username')
        .isLength({ min: 3 })
        .withMessage('must be at least 3 chars long'),
);

module.exports = router;
