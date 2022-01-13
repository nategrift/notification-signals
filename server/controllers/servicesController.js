const Project = require('../models/project');
const Service = require('../models/service');
const ServiceTypes = require('../models/serviceTypes');

SERVICE_CONFIG_REQUIREMENTS = {
    'discord': ['channel_id']
}

exports.postCreateService = async (req, res, next) => {
    try {
        if (!req.params.project) {
            res.status(404)
            throw new Error('Missing Project Id');
        }

        const existingProject = await Project.findById(req.params.project);
        if (! existingProject || existingProject.created_by_id != req.id) {
            res.status(403);
            throw new Error('Project does not exist');
        }

        const serviceType = req.body.service_type;
        const config = req.body.config;

        // check service type
        if (!serviceType || !config || !config instanceof Object) {
            res.status(403);
            throw new Error('Missing service type or config object.');
        }

        const serviceTypes = await ServiceTypes.fetchAll();

        if (!serviceTypes) {
            res.status(500);
            throw new Error('Unable to get service_types');
        }

        const service = serviceTypes.find(service => service.id == serviceType)
        if (!service) {
            res.status(403);
            throw new Error('Not a valid service_type')
        }

        // validate config object
        validObject = true;
        requirements = SERVICE_CONFIG_REQUIREMENTS[service.value];
        for (let i in requirements) {
            const requirement = requirements[i];
            if (!config[requirement]) validObject = false;
        }

        // create config object
        configObject = {};
        // this function maps out the old config object to a new object to prevent uploading extra waste properties the user might have added.
        SERVICE_CONFIG_REQUIREMENTS[service.value].forEach(key => configObject[key] = config[key]);

        const createdService = await Service.createAndSave(serviceType, req.params.project, configObject, req.body.notes ?? null);

        res.status(201).json({
            ok: true,
            message: "Service Created",
            data: createdService
        });

    } catch (err) {
        return next(err);
    }
};

exports.deleteService = async (req, res, next) => {
    try {
        if (!req.params.service) {
            res.status(404);
            throw new Error('Unable to delete this Service');
        }

        const existingProject = await Project.findById(req.params.project);
        if (! existingProject || existingProject.created_by_id != req.id) {
            res.status(404);
            throw new Error('Unable to delete this Service');
        }

        const existingService = await Service.findById(req.params.service);
        if (!existingService) {
            res.status(404);
            throw new Error('Unable to delete this Service');
        }

        await existingService.delete();

        res.status(201).json({
            ok: true,
            message: "Service Deleted",
        });
    } catch (err) {
        return next(err);
    }
};

exports.getServices = async (req, res, next) => {
    try {
        const existingProject = await Project.findById(req.params.project);
        if (! existingProject || existingProject.created_by_id != req.id) {
            res.status(404);
            throw new Error('Unable to get Services');
        }

        const services = await Service.findAllForProjectId(req.params.project);

        if (! services) {
            res.status(404);
            throw new Error('Unable to get Services');
        }

        res.status(200).json({
            ok: true,
            data: services
        });
    } catch (err) {
        return next(err);
    }
};