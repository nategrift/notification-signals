const express = require('express');

const authRoutes = require('./auth');
const projectsController = require('../controllers/projectsController');

const tokensMiddleware = require('../middleware/token.js');

const router = express.Router();

// auth routes
router.use('/auth', authRoutes);

//
// PROJECT
//
router.get('/projects', tokensMiddleware.checkToken, projectsController.getProjects);
router.post('/projects/create', tokensMiddleware.checkToken, projectsController.postCreateProject);

// router.post('/projects/:projectId', tokensMiddleware.checkToken, projectsController.postUpdateProject);
// router.delete('/projects/:projectId', tokensMiddleware.checkToken, projectsController.deleteProject);

//
// API KEYS
//
router.get('/projects/keys', tokensMiddleware.checkToken, projectsController.getKeys);
router.post('/projects/keys/create', tokensMiddleware.checkToken, projectsController.postCreateKeys);
router.delete('/projects/:projectId', tokensMiddleware.checkToken, projectsController.deleteProject);

module.exports = router;
