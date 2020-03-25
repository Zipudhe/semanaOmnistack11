const express = require('express');

const OngController = require('./Controllers/ongController');
const incidentsController = require('./Controllers/incidentsController');
const profileController = require('./Controllers/profileCotroller');
const sessionController = require('./Controllers/sessionController');

const routes = express.Router();

routes.post('/session', sessionController.create);

routes.get('/ongs', OngController.index);
routes.post('/ongs', OngController.create);

routes.get('/profile', profileController.index);

routes.post('/incidents', incidentsController.create);
routes.get('/incidents', incidentsController.index);

routes.delete('/incidents/:id', incidentsController.delete);

module.exports = routes;