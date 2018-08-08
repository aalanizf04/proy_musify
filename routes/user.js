'use strict'

var express = require('express');
var UserController = require('../controllers/user');

var api= express.Router();

api.get('/pruebaControlador',UserController.pruebas);
api.post('/register',UserController.saveUser);


module.exports= api;