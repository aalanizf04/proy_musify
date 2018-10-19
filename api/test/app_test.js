const assert = require("assert");
const request= require("supertest");
const app= require("../app");

describe("Express app", ()=>{
	it("Handles GET request /api/pruebas" , done =>{
		request(app)
			.get('/api/pruebas')
			.end((err, response) =>{
				assert(response.body.message ==="Probando control usuario");
				done();
			});
	});
});