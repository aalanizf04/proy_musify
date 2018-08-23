'use strict'

var mongoose= require('mongoose');
var Schema = mongoose.Schema;

var AlbumSchema = Schema({
	title: String,
	description: String,
	year: Number,
	artist: {
		type: Schema.ObjectId, //guarda un Id de objeto o documento de la bd
		ref: 'Artist'}			//de tipo Artist, asocia Artist con Object
	image: String
});

module.exports = mongoose.model('Album',AlbumSchema);