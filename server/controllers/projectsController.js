const Project = require('../models/project')


exports.getProjects = async (req, res, next) => {
    try {
        const projects = await Project.findAllForUser(req.id);

        res.status(200).json({
            ok: true,
            projects: projects
        });
    } catch (err) {
        return next(err);
    }
};

exports.postCreateProject = async (req, res, next) => {
    try {
        if (!req.body.name) {
            res.status(404);
        }
        const existingProject = await Project.findByNameAndUser(req.body.name, req.id);
        if (existingProject) {
            res.status(403);
            throw new Error('You already have a project with this name');
        }

        Project.createAndSave(req.body.name, req.id);

        res.status(201).json({
            ok: true,
            message: "Project Created"
        });
    } catch (err) {
        return next(err);
    }
};

exports.deleteProject = async (req, res, next) => {
    try {
        if (!req.params.project) {
            res.status(404)
        }

        const existingProject = await Project.findById(req.params.project);
        if (! existingProject || existingProject.created_by_id != req.id) {
            res.status(403);
            throw new Error('Unable to delete this Project');
        }

        existingProject.delete()

        res.status(201).json({
            ok: true
        });
    } catch (err) {
        return next(err);
    }
};
