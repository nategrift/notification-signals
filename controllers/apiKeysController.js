const ApiKey = require('../models/apiKey')
const Project = require('../models/project')

exports.getKeys = async (req, res, next) => {
    try {
        if (!req.params.project) {
            res.status(404)
        }

        const apiKeys = await ApiKey.findAllForProject(req.params.project);

        res.status(200).json({
            ok: true,
            apiKeys: apiKeys
        });
    } catch (err) {
        return next(err);
    }
};

exports.postCreateKey = async (req, res, next) => {
    try {
        if (!req.params.project) {
            res.status(404)
        }

        const existingProject = await Project.findByIdAndUser(req.params.project, req.id);
        if (! existingProject) {
            res.status(403);
            throw new Error('Unable to create API Key for this Project');
        }

        await ApiKey.createAndSave(req.params.project, req.id);

        res.status(201).json({
            ok: true,
            message: "Api Key Created"
        });
    } catch (err) {
        return next(err);
    }
};

exports.deleteKey = async (req, res, next) => {
    try {
        if (!req.params.project) {
            res.status(404)
        }

        const existingProject = await Project.findByIdAndUser(req.params.project, req.id);
        const apiKey = await ApiKey.findById(req.params.key);
        if (! existingProject || ! apiKey || apiKey.project_id != req.params.project) {
            res.status(403);
            throw new Error('Unable to delete API Key for this Project');
        }

        await apiKey.delete();

        res.status(201).json({
            ok: true
        });
    } catch (err) {
        return next(err);
    }
};
