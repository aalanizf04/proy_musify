'use strict'

var express= require('express'); 
var bodyParser = require('body-parser');

var app= express(); //crea el objeto de express en la variable app

//cargar rutas

app.use(bodyParser.urlencoded({extended: false})); // configurar bodyParser
app.use(bodyParser.json()); // convertir a objetos json las peticiones desde http

//config cabeceras http

//cargar rutas base

app.get('/pruebas', function(req,res){
	res.status(200).send({message: 'Hola wachin!'});
});

module.exports= app; //se puede usar app en ficheros que usen app