const express = require('express');

const authController = require('../controllers/authController');
const createAccountValidation = require('../middleware/Validation/createAccountValidation');
const verifyAccountValidation = require('../middleware/Validation/verifyAccountValidation');

const router = express.Router();

router.post('/login', authController.postLogin);
router.post('/create-account',
createAccountValidation,
authController.postCreateAccount
);
router.post('/verify-account',
verifyAccountValidation,
authController.postVerifyAccount
);

module.exports = router;
