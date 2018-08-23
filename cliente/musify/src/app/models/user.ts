export class User{
	constructor(
		public _id: string, //esta forma reemplaza la anterior en donde el campo se declara arriba y luego los parametros del constructor se pasan al campo con this
		public name: string,
		public surname: string,
		public email: string,
		public password: string,
		public role: string,
		public image: string
	){}
}