'use strict'

var express = require('express');
var UserController = require('../controllers/user');
var md_auth= require('../middlewares/authenticated');
var api= express.Router();
var multipart= require('connect-multiparty'); //con esto se tiene un middleware que nos permite la subida de ficheros
var md_upload= multipart({uploadDir: './uploads/users'}); //indicamos el directorio donde se suben todos los ficheros de usuario

api.get('/pruebas',md_auth.ensureAuth,UserController.pruebas);
api.post('/register',UserController.saveUser);
api.post('/login',UserController.loginUser);
api.put('/update-user/:id',md_auth.ensureAuth, UserController.updateUser); //:id hace referencia que el parametro que se espera es obligatorio, sino seria un "?" para un dato opcional
api.post('/upload-image-user/:id',[md_auth.ensureAuth,md_upload], UserController.uploadImage); //:id hace referencia que el parametro que se espera es obligatorio, sino seria un "?" para un dato opcional


module.exports= api;