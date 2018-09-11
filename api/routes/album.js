'use strict'

var express = require('express');
var AlbumController = require('../controllers/album');
var md_auth= require('../middlewares/authenticated');
var api= express.Router();
//var multipart= require('connect-multiparty'); //con esto se tiene un middleware que nos permite la subida de ficheros
//var md_upload= multipart({uploadDir: './uploads/users'}); //indicamos el directorio donde se suben todos los ficheros de usuario

api.get('/album/:id',md_auth.ensureAuth,AlbumController.getAlbum);
api.post('/album',md_auth.ensureAuth,AlbumController.saveAlbum);
api.get('/albums/:artist?',md_auth.ensureAuth,AlbumController.getAlbums);

module.exports= api;