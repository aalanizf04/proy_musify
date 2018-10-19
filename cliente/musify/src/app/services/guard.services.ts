import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate } from '@angular/router';
import { UserService } from './user.services';

@Injectable()
export class CanActivateViaAuthGuard implements CanActivate {

    constructor(private authService: UserService, private router: Router) { }

    canActivate() {
        // If the user is not logged in we'll send them back to the home page
        if (!this.authService.getIdentity()) {
            console.log('No estás logueado');
            this.router.navigate(['/']);
            return false;
        }

        return true;
    }
}