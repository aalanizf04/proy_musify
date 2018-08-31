//Clase de servicio, para hacer peticiones a la APIREST, que interactua con los metodos de la Api relacionados con los usuarios

import {Injectable} from '@angular/core';
import {Response} from '@angular/http';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {GLOBAL} from './global';

@Injectable() //para inyeccion de dependencias
export class UserService{
	
	public url: string;

	constructor(private _http: HttpClient){
		this.url=GLOBAL.url;
	}

	public signup(userToLogin, getHash=null){
		let params = JSON.stringify(userToLogin);
		let headers = new HttpHeaders({'Content-Type': 'application/json','Access-Control-Allow-Origin': '*'});
		
		return this._http.post(this.url+'/login',params,{headers:headers});
	}

}

