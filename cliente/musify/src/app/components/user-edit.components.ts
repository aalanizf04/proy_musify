import {Component, OnInit} from '@angular/core';

import {GLOBAL} from '../services/global';
import {UserService} from '../services/user.services';
import {User} from '../models/user';

@Component({	//decorador para indicar los metadatos y componentes
	selector: 'user-edit',
	templateUrl: '../views/user-edit.html', //plantilla donde se coloca el html la vista del componente
	providers: [UserService]
}) 

export class UserEditComponent implements OnInit{

	public titulo: String;
	public user: User;
	public identity;
	public token;
	public alertMessage;
	public url: string;
	public filesToUpload: Array<File>;


	constructor(private _userService: UserService){
		this.titulo = 'Actualizar mis datos';
	  	this.identity= this._userService.getIdentity();
	  	this.user= this.identity;
		this.token=this._userService.getToken();
		this.url= GLOBAL.url;
	}

	ngOnInit(){
		console.log("user-edit cargado");
	}

	onSubmit(){
		this._userService.update_user(this.user).subscribe(
			response =>{
				console.log(response);
				if(!response.user){
          			this.alertMessage='El usuario no se ha actualizado';
				} else{
					//this.user=response.user;
					localStorage.setItem('identity',JSON.stringify(this.user));
					document.getElementById("identity_name").innerHTML = this.user.name; //se modifica a nivel de base de datos y a nivel de front

					if(!this.filesToUpload){
						//redireccion
					}else{
						this.makeFileRequest(this.url+'/upload-image-user/'+this.user._id,[], this.filesToUpload).then(
							(result: any)=> {
								this.user.image=result.image;
								console.log(this.user);
								localStorage.setItem('identity',JSON.stringify(this.user));

								let image_path= this.url+'/get-image-user/'+this.user.image;
								//document.getElementById('image-logged').setAttribute('src',image_path);
								//image_path=null;
							}
						);
					}

          			this.alertMessage='El usuario se ha actualizado correctamente';
				}

			},error=>{
				//console.log("viene por aca");
        		var errorMessage=<any> error;

        		if(errorMessage!=null){
          			let fin= errorMessage.error.message;
          			this.alertMessage=fin;
          		}
			}
		);
	}

	fileChangeEvent(fileInput: any){
		this.filesToUpload = <Array<File>> fileInput.target.files; //recoger los archivos seleccionados en el pinput y posteriormente subirlos 
	}

	makeFileRequest(url: string, params: Array<string> , files: Array<File>){ //peticion ajax para subir ficheros convencional
		//posteriormente llevar a un servicio para reutilizarlo
		var token = this.token;
		return new Promise(function(resolve,reject){
			var formData: any = new FormData();
			var xhr = new XMLHttpRequest();

			for(var i=0; i<files.length; i++){
				formData.append('image', files[i], files[i].name);
			}

			xhr.onreadystatechange = function(){
				if(xhr.readyState==4){
					if(xhr.status==200){
						resolve(JSON.parse(xhr.response));
					}else{
						console.log("viene por aca1234");
						reject(xhr.response);
					}
				}
			}

			xhr.open('POST', url, true);
			xhr.setRequestHeader('Authorization',token);
			xhr.send(formData);
		});
	}

}