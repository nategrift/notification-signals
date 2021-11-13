const express = require('express');

const authRoutes = require('./auth');

const router = express.Router();

// auth routes
router.use('/auth', authRoutes);

module.exports = router;
