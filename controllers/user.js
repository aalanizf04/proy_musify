'use strict'

var User = require('../models/user'); 
var bcrypt= require('bcrypt-nodejs'); //guardar la contraseña ya encriptada

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

module.exports = {
	pruebas,
	saveUser
};