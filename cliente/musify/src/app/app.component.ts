import { Component, OnInit } from '@angular/core';
import {User} from './models/user';
import {UserService} from './services/user.services';
import {GLOBAL} from './services/global';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [UserService]
})

export class AppComponent implements OnInit{
  public title = 'Musify';
  public user: User;
  public user_register: User;
  public identity;
  public token;
  public errorMessage;
  public alertRegister;
  public url: string;

  constructor(private _userService: UserService){
  	this.user= new User('','','','','','ROLE_USER','');
    this.user_register= new User('','','','','','ROLE_USER','');
    this.url= GLOBAL.url;
  }

  public onSubmit(){
     //conseguir los datos del usuario identificado
    this._userService.signup(this.user).subscribe(
      response=>{
        console.log(response);
        let identity = response.user;
        this.identity = identity;

        if(!this.identity._id){
          alert("El usuario no esta correctamente identificado");
        }else{
          //Crear elemento en el localstorage
          localStorage.setItem('identity',JSON.stringify(identity)); //podemos definir un elemento en el localStorage

          this._userService.signup(this.user, 'true').subscribe(
              response=>{
                let token = response.token;
                this.token = token;

                if(this.token.length <= 0){
                  alert("El token no se ha generado");
                }else{
                  //Crear elemento en el localstorage para tener token disponible
                  localStorage.setItem('token',token);
                  this.user= new User('','','','','','ROLE_USER','');
                  }
              },
              error=>{
                var errorMessage=<any> error;

                if(errorMessage!=null){
                  var body= JSON.parse(error._body);
                  this.errorMessage= body.message;
                  console.log(error);}
              },
              () => {
                console.log("Termine")
              }
              ); 
          //Conseguir el token para enviarselo a cada peticion HTTP
        }
      },
      error=>{
        var errorMessage=<any> error;

        if(errorMessage!=null){
          let fin= errorMessage.error.message;
          this.errorMessage=fin;
          }
      }
      ); 
  }

  public ngOnInit(){
    this.identity= this._userService.getIdentity();
    this.token=this._userService.getToken();
    }

  public logout(){
    console.log("entro el logout");
    localStorage.removeItem('identity');
    localStorage.removeItem('token');
    localStorage.clear();
    this.identity= null;
    this.token=null;
    this.user.gethash=null;
    this.alertRegister=null;
  }

  public onSubmitRegister(){
    console.log(this.user_register);
    this._userService.register(this.user_register).subscribe(
      response =>{
        let user = response.user;
        this.user_register=user;

        if(!user._id){
          this.alertRegister= 'error al registrarse';
        }else{
          this.alertRegister= 'Sin errores al registrarse, identificate con '+ this.user_register.email;
          this.user_register= new User('','','','','','ROLE_USER','');
        }
      },
      error=> {
        var errorMessage=<any> error;

        if(errorMessage!=null){
          let fin= errorMessage.error.message;
          this.alertRegister=fin;
          }
      }
      );
  }

}