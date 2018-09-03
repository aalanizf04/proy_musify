//Clase de servicio, para hacer peticiones a la APIREST, que interactua con los metodos de la Api relacionados con los usuarios

import {Injectable} from '@angular/core';
import {Response} from '@angular/http';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {GLOBAL} from './global';

@Injectable() //para inyeccion de dependencias
export class UserService{
	
	public url: string;
	public identity;
	public token;

	constructor(private _http: HttpClient){
		this.url=GLOBAL.url;
	}

	public signup(userToLogin, gethash=null){

		if(gethash !=null){
			userToLogin.gethash = gethash;
		}
		
		let params = JSON.stringify(userToLogin);
		let headers = new HttpHeaders({'Content-Type': 'application/json','Access-Control-Allow-Origin': '*'});
		
		return this._http.post(this.url+'/login',params,{headers:headers});
	}

	public getIdentity(){
		let identity= JSON.parse(localStorage.getItem('identity'));
		if(identity!= "undefined"){
			this.identity= identity;
		}else{
			this.identity=null;
		}
		return this.identity;
	}

	public getToken(){
		let token= localStorage.getItem('token');
		if(token!= "undefined"){
			this.token= token;
		}else{
			this.token=null;
		}
		return this.token;
	}

	public register(userToRegister){
		let params = JSON.stringify(userToRegister);
		let headers = new HttpHeaders({'Content-Type': 'application/json','Access-Control-Allow-Origin': '*'});
		
		return this._http.post(this.url+'/register',params,{headers:headers});
	}

}

