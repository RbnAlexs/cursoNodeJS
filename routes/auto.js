'use strict'

//importam,os express
var express = require('express')
//Importamos el controlador
var autoController = require('../controllers/auto')

//instancioamos un objeto Roter
var api = express.Router();

/*Defiimos el recurso GET con url : /api/auto/:id?, recibe un parametro y se procesa en el metodo prueba del controlador autoController*/
//api.get('/auto/:id?', autoController.prueba)
api.get('/auto/:id?', autoController.getAuto);
api.get('/autos/', autoController.getAutos);
api.post('/auto/', autoController.saveAuto);
api.put('/auto/:id?', autoController.updateAuto);
api.delete('/auto/:id?',autoController.deleteAuto);

module.exports = api;