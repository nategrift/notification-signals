const express = require('express');

const authRoutes = require('./auth');

const projectsController = require('../controllers/projectsController');
const apiKeysController = require('../controllers/apiKeysController');

const tokensMiddleware = require('../middleware/token.js');

const router = express.Router();

// auth routes
router.use('/auth', authRoutes);

//
// PROJECT
//
router.get('/projects', tokensMiddleware.checkToken, projectsController.getProjects);
router.post('/projects/create', tokensMiddleware.checkToken, projectsController.postCreateProject);
router.delete('/projects/:project', tokensMiddleware.checkToken, projectsController.deleteProject);

//
// API KEYS
//
router.get('/projects/:project/keys', tokensMiddleware.checkToken, apiKeysController.getKeys);
router.post('/projects/:project/keys/create', tokensMiddleware.checkToken, apiKeysController.postCreateKey);
router.delete('/projects/:project/keys/:key', tokensMiddleware.checkToken, apiKeysController.deleteKey);

module.exports = router;
