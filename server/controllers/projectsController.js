const Project = require('../models/project')

exports.getProjects = async (req, res, next) => {
    try {
        const projects = await Project.findAllForUser(req.id);

        if (!projects) {
            res.status(201).json({
                ok: true,
                message: "No projects at this time. Please create one and come back.",
                data: projects
            });
        }

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
            res.status(400);
            throw new Error('Please include a name to create a project.');
        }

        const existingProject = await Project.findByNameAndUser(req.body.name, req.id);
        if (existingProject) {
            res.status(403);
            throw new Error('You already have a project with this name');
        }

        const project = await Project.createAndSave(req.body.name, req.id);

        res.status(201).json({
            ok: true,
            message: "Project Created",
            data: project
        });
    } catch (err) {
        return next(err);
    }
};

exports.deleteProject = async (req, res, next) => {
    try {
        if (!req.params.project) {
            res.status(400)
            throw new Error('Please include an project_id.');
        }

        const existingProject = await Project.findById(req.params.project);
        if (! existingProject || existingProject.created_by_id != req.id) {
            res.status(403);
            throw new Error('Unable to delete this Project');
        }

        await existingProject.delete()

        res.status(201).json({
            ok: true,
            message: "Project Deleted",
        });
    } catch (err) {
        return next(err);
    }
};
