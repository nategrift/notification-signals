const express = require('express');

const projectsController = require('../controllers/projectsController');
const apiKeysController = require('../controllers/apiKeysController');
const servicesController = require('../controllers/servicesController');

const router = express.Router();

/*
 * PROJECT
 */
router.get('/projects', projectsController.getProjects);
router.post('/projects/create', projectsController.postCreateProject);
// update project
router.delete('/projects/:project', projectsController.deleteProject);

/*
 * API KEYS
 */
router.get('/projects/:project/keys', apiKeysController.getKeys);
router.post('/projects/:project/keys/create', apiKeysController.postCreateKey);
router.delete('/projects/:project/keys/:key', apiKeysController.deleteKey);
// Lock api key toggle

/*
 * SERVICES
 */
router.get('/projects/:project/services', servicesController.getServices);
router.post('/projects/:project/services/create', servicesController.postCreateService);
// Update Services
router.delete('/projects/:project/services/:service', servicesController.deleteService);
// Set Service to Enabled or Disabled

module.exports = router;
