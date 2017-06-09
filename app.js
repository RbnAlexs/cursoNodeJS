//Importamos body-parser y express
var bodyParser = require('body-parser')
var express = require('express')

var app = express()
//Importamos las rutas del recurso para autos
var api = require('./routes/auto')  

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json()) 

app.use(function(req,res, next){
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers','X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method');
	res.header('Allow', 'GET, POST, PUT, DELETE');
	next();
});

//URL de la API
app.use('/api', api)

//Para utilizarlo en otros ficheros e importar
module.exports = app; 