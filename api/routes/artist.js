'use strict'

var express = require('express');
var ArtistController = require('../controllers/artist');
var md_auth= require('../middlewares/authenticated');
var api= express.Router();
//var multipart= require('connect-multiparty'); //con esto se tiene un middleware que nos permite la subida de ficheros
//var md_upload= multipart({uploadDir: './uploads/users'}); //indicamos el directorio donde se suben todos los ficheros de usuario

api.get('/artist/:id',md_auth.ensureAuth,ArtistController.getArtist);
api.post('/artist',md_auth.ensureAuth,ArtistController.saveArtist);
api.get('/artists/:page?',md_auth.ensureAuth,ArtistController.getArtists);
api.put('/artist/:id',md_auth.ensureAuth, ArtistController.updateArtist);
api.delete('/artist/:id',md_auth.ensureAuth, ArtistController.deleteArtist);

module.exports= api;