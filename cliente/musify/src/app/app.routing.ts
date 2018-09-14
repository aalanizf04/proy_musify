import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {UserEditComponent} from './components/user-edit.components';
import {ArtistListComponent} from './components/artist-list.component';
//import {AppComponent} from './app.component';



const appRoutes: Routes = [
	//{path: '', component: AppComponent},
	{path: 'artista', component: ArtistListComponent},
	{path: 'mis-datos', component: UserEditComponent},
	{path: '**', component: ArtistListComponent}, 		//es para una ruta mal puesta
];

export const appRoutingProviders: any[]=[];
export const routing: ModuleWithProviders= RouterModule.forRoot(appRoutes);
