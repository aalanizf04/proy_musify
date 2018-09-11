'use strict'

var Artist = require('../models/artist'); 
//var bcrypt= require('bcrypt-nodejs'); //guardar la contraseña ya encriptada
//var jwt= require('../services/jwt');
var mongoosePaginate= require('mongoose-pagination');
var fs= require('fs');
var path = require('path');
var Album = require('../models/album');
var Song = require('../models/song');

function getArtist(req, res){
	var ArtistId= req.params.id;

	Artist.findById(ArtistId, (err,artist)=>{
		if(err){
			res.status(500).send({message: 'Error en la peticion'});
		}else{
			if(!artist){
				res.status(404).send({message: 'El artista no existe'});
			}else{
				res.status(200).send({artist});
			}
		}
	});
}

function saveArtist(req, res){
	var artist= new Artist();
	var params= req.body;
	
	artist.name = params.name;
	artist.description = params.description;
	artist.image = 'null';
	artist.save((err,artistStored) =>{
		if(err){
			res.status(500).send({message: 'Error al guardar el artista'});
		}else{
			if(!artistStored){
				res.status(404).send({message: 'No se guardo el artista'});
			}else{
				res.status(200).send({artist: artistStored});
			}
			}
		});
}

function getArtists(req,res){
	if(req.params.page){
		var page= req.params.page;
	}else{
		var page= 1;
	}
	var itemsPerPage=5;

	Artist.find().sort('name').paginate(page,itemsPerPage, function(err,artists,total){
		if(err){
			res.status(500).send({message: 'Error en la peticion'});
		}else{
			if(!artists){
				res.status(404).send({message: 'No hay artistas'});
			}else{
				return res.status(200).send({
					total_items: total,
					artists: artists}); //el primero es el nombre que aparece en la respuesta, el segundo es el array que recibe la funcion
			}
		}
	});
}

function updateArtist (req,res){
	var update = req.body;
	var artistId = req.params.id;

	/*if(artistId!=req.artist.sub){
		return res.status(500).send({message: 'No tienes permiso'}); //cuando detecta esto automaticamente se sale sin ejecutar las acciones de mas abajo
	}*/

	Artist.findByIdAndUpdate(artistId,update, (err,ArtistUpdated) => {
		if(err){
			res.status(500).send({message: 'Error al actualizar el artista'});
		}else{
			if(!ArtistUpdated){
				res.status(404).send({message: 'No se ha podido actualizar el artista'});
			}else{
				res.status(200).send({artist: ArtistUpdated});
			}
		}
	});
}

function deleteArtist (req, res){
	var artistId= req.params.id;
	Artist.findByIdAndRemove(artistId,(err,artistRemoved) =>{
		if(err){
			res.status(500).send({message: 'Error al eliminar el artista'});
		}else{
			if(!artistRemoved){
				res.status(404).send({message: 'No se ha podido eliminar el artista'});
			}else{
				Album.find({artist: artistRemoved._id}).remove((err,albumRemoved)=>{
					if(err){
						res.status(500).send({message: 'Error al eliminar el album'});
						}else{
							if(!albumRemoved){
								res.status(404).send({message: 'No se ha podido eliminar el album'});
							}else{
								Song.find({album: albumRemoved._id}).remove((err,songRemoved)=>{
									if(err){
										res.status(500).send({message: 'Error al eliminar la cancion'});
										}else{
											if(!songRemoved){
												res.status(404).send({message: 'No se ha podido eliminar la cancion'});
											}else{
												res.status(200).send({artist: artistRemoved});
											}
										}
									});
							}
						}
				});
			}
		}
	});
}

module.exports = {
	getArtist,
	saveArtist,
	getArtists,
	updateArtist,
	deleteArtist
};