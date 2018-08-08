'use strict'

var mongoose= require('mongoose');
var Schema = mongoose.Schema;//posibilita definir esquemas de la base de datos, guardando los datos en objeto Schema guarda en una coleccion concreta

var ArtistSchema = Schema({
	name: String,
	description: String,
	image: String
});

module.exports = mongoose.model('Artist',ArtistSchema);