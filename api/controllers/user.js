'use strict'

var User = require('../models/user'); 
var bcrypt= require('bcrypt-nodejs'); //guardar la contraseña ya encriptada
var jwt= require('../services/jwt');
var mongoosePaginate= require('mongoose-pagination');

function pruebas(req,res){
	res.status(200).send({
		message: 'Probando control usuario'
	});
}

function saveUser(req, res){
	var user= new User();	// tenemos una instancia del modelo de usuario, se puede setear las propiedades del objeto
	var params= req.body;	// recoger (el cuerpo de la peticion) los parametros por POST que nos llegan.
	console.log(params);	//muestra en el terminal lo que llega de la peticion
	//mover los parametros del POST al objeto User
	user.name = params.name;
	user.surname = params.surname;
	user.email = params.email;
	user.role= 'ROLE_USER';
	user.image= 'null';

	if(params.password){
		//encriptar contraseña y guardar dato
		bcrypt.hash(params.password,null,null,function(err,hash){
			user.password=hash;
			if(user.name!=null && user.surname != null){
				//guarda el usuario
				user.save((err,userStored) =>{
					if(err){
						res.status(500).send({message: 'Error al guardar el usuario'});
					} else{
						if(!userStored){
							res.status(404).send({message: 'No se registro el usuario'});
						} else{
							res.status(200).send({user: userStored});
						}
					}
				});
			}else{
				res.status(200).send({message: 'faltan campos'});
			}
		});
	} else{
		res.status(500).send({message: 'falta contraseña'});
	}
}

function loginUser(req,res){
	var params= req.body;

	var email= params.email;
	var password=params.password;

	User.findOne({email: email.toLowerCase()}, (err,user)=>{
		if(err){
			res.status(500).send({message: 'Error en la peticion'});
		}else{
			if(!user){
				res.status(404).send({message: 'El usuario no existe'});
			}else{
				bcrypt.compare(password, user.password, function(err,check){
					if(check){
						if(params.gethash){	// si existe gethash, devuelve un token de jwt, se genera un token con el objeto del usuario (con todos los datos)
							//devuelve un token de jwt
							res.status(200).send({
								token: jwt.createToken(user)
							});
						}else{
							//res.status(404).send({message: 'Viene por aca'});							
							res.status(200).send({user})
						}
					}else{
						res.status(404).send({message: 'El usuario o contrasena es invalido'});
					}
				});
			}
		}
	})
}

function updateUser (req,res){
	var update = req.body;
	var userId = req.params.id;   // id es el nombre del campo que se pone en la ruta, si yo quiero cambiar este campo aqui, y en routes no cambio se produce el 404 del codigo
	//params hace referencia a lo que viene luego de la rutas preestablecidas en routes/user.js

	User.findByIdAndUpdate(userId,update, (err,userUpdated) => {
		if(err){
			res.status(500).send({message: 'Error al actualizar el usuario'});
		}else{
			if(!userUpdated){
				res.status(404).send({message: 'No se ha podido actualizar el usuario'});
			}else{
				res.status(200).send({user: userUpdated});
			}
		}
	});
}

function uploadImage(req,res){
	var userId = req.params.id;
	var file_name= 'No subido ...';

	if(req.files){
		var file_path= req.files.image.path;
		console.log(file_path);
	}else{
		res.status(200).send({message: 'No has subido ninguna imagen'});
	}
}

function getUser(req,res){
	var page= req.params.page;
	var itemsPerPage=5;

	User.find().sort('name').paginate(page,itemsPerPage, function(err,users,total){
		if(err){
			res.status(500).send({message: 'Error en la peticion'});
		}else{
			if(!users){
				res.status(404).send({message: 'No hay usuarios'});
			}else{
				return res.status(200).send({
					total_items: total,
					users: users});
			}
		}
	});
}

module.exports = {
	pruebas,
	saveUser,
	loginUser,
	updateUser,
	uploadImage,
	getUser
};