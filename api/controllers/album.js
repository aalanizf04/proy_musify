'use strict'

var Artist = require('../models/artist'); 
//var bcrypt= require('bcrypt-nodejs'); //guardar la contraseña ya encriptada
//var jwt= require('../services/jwt');
var mongoosePaginate= require('mongoose-pagination');
var fs= require('fs');
var path = require('path');
var Album = require('../models/album');
var Song = require('../models/song');

function getAlbum(req, res){

	var albumId= req.params.id;

	Album.findById(albumId).populate({path: 'artist'}).exec((err, album) =>{ //el path: la propiedad donde se van a cargar los datos asociados de artist. Con esto se consiguen los datos del artista que ha creado el album.
		//populate es un metodo de mongoose que permite listar un objeto dentro de otro, en este caso cada album tiene un artista linkeado mediante id, al hacer populate muestra info detallada de ese artista
		if(err){
			res.status(500).send({message: 'Error en la peticion'});
		}else{
			if(!album){
				res.status(404).send({message: 'El album no existe'});
			}else{
				res.status(200).send({album});
			}
		}
	});	

}

function saveAlbum(req, res){
	var album= new Album();
	var params= req.body;
	
	album.title = params.title;
	album.description = params.description;
	album.year= params.year;
	album.image = 'null';
	album.artist= params.artist;

	album.save((err,albumStored) =>{
		if(err){
			res.status(500).send({message: 'Error al guardar el album'});
		}else{
			if(!albumStored){
				res.status(404).send({message: 'No se guardo el album'});
			}else{
				res.status(200).send({album: albumStored});
			}
		}
	});
}

function getAlbums(req,res){
	var artistId= req.params.artist;
	if(!artistId){ // si no llega el id de artista
		//sacar todos los albums de la base de datos
		var find = Album.find({}).sort('title');
	}else{
		//sacar los albums de un artista determinado
		var find = Album.find({artist: artistId}).sort('year');
	}

	find.populate({path: 'artist'}).exec((err,albums) =>{
		if(err){
			res.status(500).send({message: 'Error en la peticion'});
		}else{
			if(!albums){
				res.status(404).send({message: 'No hay albums'});
			}else{
				res.status(200).send({albums});
			}
		}
	});
}

module.exports = {
	getAlbum,
	saveAlbum,
	getAlbums
};