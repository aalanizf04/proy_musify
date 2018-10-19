const mongoose = require  ('mongoose');

before(done =>{
	mongoose.connect("mongodb://localhost:27017/proy_musify");
	mongoose.connection
	.once("open",()=>{
		console.log("Conectado a la BD de testing");
		done();
	})
	.on("error", err=>{
		console.warn("Warning", err);
	});
});