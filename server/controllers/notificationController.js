const ApiKey = require('../models/apiKey');
const Project = require('../models/project');
const Service = require('../models/service');
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
    if (!project) {
        res.status(400);
        throw new Error('Api Key not validsssss');
    }

    const services = await Service.findAllForProjectId(apiKey.project_id)
    if (!services) {
        res.status(400);
        throw new Error('Please create a service before sending a message');
    }

    if (!title || !message) {
        res.status(400);
        throw new Error('Missing title or message for notification');
    }

    await NotificationService.sendNotifications(apiKey, title, message, color)

    // should eventually show what services the message was sent too.
    res.status(201).json({
        ok: true,
        message: "Message Sent"
    });
}
