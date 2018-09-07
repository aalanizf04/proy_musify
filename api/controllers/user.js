'use strict'

var User = require('../models/user'); 
var bcrypt= require('bcrypt-nodejs'); //guardar la contraseña ya encriptada
var jwt= require('../services/jwt');
var mongoosePaginate= require('mongoose-pagination');
var fs= require('fs');
var path = require('path');

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
	if(userId!=req.user.sub){
		return res.status(500).send({message: 'No tienes permiso'}); //cuando detecta esto automaticamente se sale sin ejecutar las acciones de mas abajo
	}

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
		var file_split = file_path.split('/');
		console.log(file_split);
		var file_name = file_split[2]; // nombre de la imagen con su extension

		var ext_split= file_name.split('\.');
		var file_ext=ext_split[1];

		if(file_ext=='png'|| file_ext=='jpg' || file_ext=='gif'){
			User.findByIdAndUpdate(userId, {image: file_name}, (err,UserUpdated) =>{
				if(!UserUpdated){
					res.status(404).send({message: 'No se ha podido subir la foto del usuario'});
				}else{
					res.status(200).send({image:file_name, user: UserUpdated});
				}				
			});
		}else{
			res.status(200).send({message: 'Extension del archivo no valida'});
		}
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

function getImageFile(req,res){
	var imageFile = req.params.imageFile;
	var path_file='./uploads/users/'+imageFile;
	fs.exists(path_file,function(exists){
		if(exists){
			res.sendFile(path.resolve(path_file));
		}else{
			res.status(200).send({message: "No existe la imagen ..."});
		}
	});
}

module.exports = {
	pruebas,
	saveUser,
	loginUser,
	updateUser,
	uploadImage,
	getUser,
	getImageFile
};