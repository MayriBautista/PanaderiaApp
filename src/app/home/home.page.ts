import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { AlertController } from '@ionic/angular';
import { HttpService } from '../http.service';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  nombre:string;
  contra:string;

  constructor(
    public alertController: AlertController,
    public http:HttpService, 
    private storage: Storage, 
    public toastController: ToastController, 
    public route: Router
  ) {}

  verificar(){

    if( this.nombre != undefined && this.contra != undefined){
      this.inicio();
    } else {
      this.alerta('Uno o más campos están vacíos');
    }
  }

inicio() {
  console.log(this.nombre+this.contra);
  this.http.login(this.nombre,this.contra).then(
    (inv) => {
      console.log(inv);
      var idUsuario=inv['idUsuario'];
      var pass=inv['contrasena'];
      var nombre=inv['nombre'];
      var tipoUsuario=inv['tipoUsuario'];
      console.log(idUsuario,pass,tipoUsuario);
        this.storage.set('contrasena',pass);
        this.storage.set('idUsuario', idUsuario);
        this.storage.set('nombre', nombre);
        this.storage.set('tipoUsuario', tipoUsuario);
        if(idUsuario != 0){
          if(idUsuario == -2){
            this.mensaje();
          } else {
            if(tipoUsuario == "Administrador") {
              this.route.navigateByUrl('/inicio');
            }
            if(tipoUsuario == "Empleado") {
              this.route.navigateByUrl('/home-empleado');
            }  
            }
        } else {
          this.presentToast();
        }
    },
    (error) =>{
      console.log("Error"+JSON.stringify(error));
      alert("Verifica que cuentes con internet");
    }
  );
}


async alerta(mensaje) {
  const toast = await this.toastController.create({
    message: mensaje,
    position: 'middle',
    duration: 2000
  });
  toast.present();
}

async mensaje() {
  const toast = await this.toastController.create({
    message: 'Contraseña Incorrecta.',
    duration: 2000
  });
  toast.present();
}

async presentToast() {
  const toast = await this.toastController.create({
    message: 'Contraseña y/o usuario incorrecto',
    duration: 2000
  });
  toast.present();
}

}
