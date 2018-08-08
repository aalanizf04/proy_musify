'use strict'

var express= require('express'); 
var bodyParser = require('body-parser');

var app= express(); //crea el objeto de express en la variable app

//cargar rutas
var user_routes= require('./routes/user');

app.use(bodyParser.urlencoded({extended: false})); // configurar bodyParser
app.use(bodyParser.json()); // convertir a objetos json las peticiones desde http

//config cabeceras http

//cargar rutas base
app.use('/api', user_routes)

module.exports= app; //se puede usar app en ficheros que usen app