'use strict'

var mongoose= require('mongoose');
var Schema = mongoose.Schema;//posibilita definir esquemas de la base de datos, guardando los datos en objeto Schema guarda en una coleccion concreta

var UserSchema = Schema({
	name: String,
	surname: String,
	email: String,
	password: String,
	role: String,
	image: String
});

module.exports = mongoose.model('User',UserSchema); //cuando se utilicemos el UserSchema vamos a tener un objeto User, que se instancia y se le asignaran valores al Schema en este archivo