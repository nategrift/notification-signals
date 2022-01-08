const express = require('express');

const authController = require('../controllers/authController');
const createAccountValidation = require('../middleware/Validation/createAccountValidation');

const router = express.Router();

router.post('/login', authController.postLogin);
router.post('/create-account',
createAccountValidation,
authController.postCreateAccount
);
router.get('/verify-account',
authController.getVerifyAccount
);

module.exports = router;
