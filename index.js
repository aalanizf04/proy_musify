'use strict'

var mongoose = require('mongoose');
var app= require('./app');
var port= process.env.PORT||3978;

mongoose.Promise= global.Promise;
mongoose.connect('mongodb://localhost:27017/proy_musify',(err,res) => {
	if(err){
		throw err;
	}else{
		console.log("La conexion a bd funciona");
		app.listen(port, function(){
			console.log("Servidor escuchando en http://localhost: "+port);
		});
	}
});