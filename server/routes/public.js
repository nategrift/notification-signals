const express = require('express');

const notificationController = require('../controllers/notificationController');

const router = express.Router();

router.post('/notification', notificationController.postSendNotification);
router.get('/notification', notificationController.getSendNotification);

module.exports = router;
