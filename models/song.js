'use strict'

var mongoose= require('mongoose');
var Schema = mongoose.Schema;

var SongSchema = Schema({
	name: String,
	number: String, //orden en el album
	duration: String,
	file: String, //el fichero de audio asociado (mp3,etc)
	album: {type: Schema.ObjectId,
		ref:'Album'}
});

module.exports = mongoose.model('Song',SongSchema);