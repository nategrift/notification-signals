const ApiKey = require('../models/apiKey');
const Project = require('../models/project');
const NotificationService = require('../services/NotificationService');

exports.postSendNotification = async (req, res, next) => {
    try {
        await sendNotification(res, req.body.key, req.body.title, req.body.message, req.body.color)
    } catch (err) {
        return next(err);
    }
};

exports.getSendNotification = async (req, res, next) => {
    try {
        await sendNotification(res, req.query.key, req.query.title, req.query.message, req.query.color)
    } catch (err) {
        return next(err);
    }
};

async function sendNotification(res, key, title, message, color) {
    if (!key) {
        res.status(400);
        throw new Error('Please provide api key.');
    }
    const apiKey = await ApiKey.findByApiKey(key);
    if (!apiKey || apiKey.locked) {
        res.status(400);
        throw new Error('Api Key not valid');
    }

    const project = await Project.findById(apiKey.project_id);
    if (!project || project.locked) {
        res.status(400);
        throw new Error('Api Key not valid');
    }

    if (!title || !message) {
        res.status(400);
        throw new Error('Missing title or message for notification');
    }

    await NotificationService.sendNotifications(apiKey, title, message, color)

    res.status(201).json({
        ok: true,
        message: "Message Sent"
    });
}
