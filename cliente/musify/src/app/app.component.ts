import { Component, OnInit } from '@angular/core';
import {User} from './models/user';
import {UserService} from './services/user.services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [UserService]
})

export class AppComponent implements OnInit{
  public title = 'Musify';
  public user: User;
  public identity;
  public token;

  constructor(private _userService: UserService){
  	this.user= new User('','','','','','ROLE_USER','');

  }

  public onSubmit(){
  	//console.log(this.user);
    //console.log(this._userService.signup(this.user));
    this._userService.signup(this.user).subscribe(
      response=>{
        //console.log("viene por response");
        console.log(response);
      },
      error=>{
        var errorMessage=<any> error;
        if(errorMessage!=null){
        //console.log("viene por error");
        console.log(error);}
      }
      ); 
  }

  public ngOnInit(){
    console.log();
  }
}
