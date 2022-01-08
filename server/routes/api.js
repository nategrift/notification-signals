const express = require('express');

const authRoutes = require('./auth');

const projectsController = require('../controllers/projectsController');
const apiKeysController = require('../controllers/apiKeysController');
const servicesController = require('../controllers/servicesController');

const tokensMiddleware = require('../middleware/token.js');

const router = express.Router();

// auth routes
router.use('/auth', authRoutes);

/*
 * PROJECT
 */
router.get('/projects', tokensMiddleware.checkToken, projectsController.getProjects);
router.post('/projects/create', tokensMiddleware.checkToken, projectsController.postCreateProject);
// update project
router.delete('/projects/:project', tokensMiddleware.checkToken, projectsController.deleteProject);

/*
 * API KEYS
 */
router.get('/projects/:project/keys', tokensMiddleware.checkToken, apiKeysController.getKeys);
router.post('/projects/:project/keys/create', tokensMiddleware.checkToken, apiKeysController.postCreateKey);
router.delete('/projects/:project/keys/:key', tokensMiddleware.checkToken, apiKeysController.deleteKey);

/*
 * SERVICES
 */
// Get Services
router.get('/projects/:project/services', tokensMiddleware.checkToken, servicesController.getServices);
router.post('/projects/:project/services/create', tokensMiddleware.checkToken, servicesController.postCreateService);
// Update Services
router.delete('/projects/:project/services/:service', tokensMiddleware.checkToken, servicesController.deleteService);
// Set Service to Enabled or Disabled

module.exports = router;
