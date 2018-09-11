'use strict'

var express= require('express'); 
var bodyParser = require('body-parser');
var cors = require('cors');

var app= express(); //crea el objeto de express en la variable app

//cargar rutas
var user_routes= require('./routes/user');
var artist_routes = require('./routes/artist');
var album_routes= require('./routes/album');

app.use(cors());
app.use(bodyParser.urlencoded({extended: false})); // configurar bodyParser
app.use(bodyParser.json()); // convertir a objetos json las peticiones desde http

//config cabeceras http
app.use((req,res,next) =>{
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method ');
	res.header('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,PUT,DELETE');
	res.header('Allow', 'GET,POST,OPTIONS,PUT,DELETE');

	next();
});

//cargar rutas base
app.use('/api', user_routes);
app.use('/api', artist_routes);
app.use('/api', album_routes);

module.exports= app; //se puede usar app en ficheros que usen app