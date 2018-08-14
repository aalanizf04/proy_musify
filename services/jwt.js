'use strict'

var jwt= require('jwt-simple');
var moment= require('moment'); // moment js, en el payload pone la fecha de creacion y de expiracion del token, con las fechas incorrectas se debe volver a loggear por el vencimiento del token.
var secret = 'clave_secreta';

exports.createToken = function(user){ //pasa como parametro el objeto de usuario, que lo guarda dentro de un token/hash. se va transportando la informacion del usuario loggeado
	var payload = {
		sub: user._id, //id del documento de la base de datos
		name: user.name,
		surname: user.surname,
		email: user.email,
		role: user.role,
		image: user.image,
		iat: moment().unix(),
		exp: moment().add(30,'days').unix()
	};

	return jwt.encode(payload,secret);
};