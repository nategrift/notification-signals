const ApiKey = require('../models/apiKey')
const Project = require('../models/project')

exports.getKeys = async (req, res, next) => {
    try {
        if (!req.params.project) {
            res.status(404)
            throw new Error('Unable to get Api Keys.');
        }

        const project = await Project.findById(req.params.project);
        if (! project || project.created_by_id != req.id) {
            res.status(404);
            throw new Error('Unable to get Api Keys.');
        }

        const apiKeys = await ApiKey.findAllForProject(req.params.project);

        res.status(200).json({
            ok: true,
            data: apiKeys
        });
    } catch (err) {
        return next(err);
    }
};

exports.postCreateKey = async (req, res, next) => {
    try {
        if (! req.params.project) {
            res.status(404)
            throw new Error('Missing product in url param.');
        }

        if (! req.body.name) {
            res.status(400)
            throw new Error('Please include a name to create a apiKey.');
        }

        const project = await Project.findById(req.params.project);
        if (! project || project.created_by_id != req.id) {
            res.status(403);
            throw new Error('Unable to create API Key for this Project');
        }

        const apiKey = await ApiKey.createAndSave(req.params.project, req.id, req.body.name);

        res.status(201).json({
            ok: true,
            message: "Api Key Created",
            data: apiKey
        });
    } catch (err) {
        return next(err);
    }
};

exports.deleteKey = async (req, res, next) => {
    try {
        if (!req.params.project) {
            res.status(404)
            throw new Error('Unable to delete API Key');
        }

        const project = await Project.findById(req.params.project);
        if (! project || project.created_by_id != req.id) {
            res.status(404);
            throw new Error('Unable to delete API Key');
        }
        const apiKey = await ApiKey.findById(req.params.key);
        if (! apiKey || apiKey.project_id != req.params.project) {
            res.status(404);
            throw new Error('Unable to delete API Key');
        }

        await apiKey.delete();

        res.status(201).json({
            ok: true,
            message: "Deleted Key"
        });
    } catch (err) {
        return next(err);
    }
};
