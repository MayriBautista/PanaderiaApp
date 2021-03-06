import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-add-gasto',
  templateUrl: './add-gasto.page.html',
  styleUrls: ['./add-gasto.page.scss'],
})
export class AddGastoPage implements OnInit {

  fechaC: string = new Date().toISOString();
  fecha: string = this.fechaC;
  nombre:string;
  idUsuario:string;
  total:string;
  descripcion:string;

  constructor(
    public http:HttpService,
    public alertController: AlertController,
    public route: Router, 
    public toastController: ToastController) { 
    this.mostrarDatos();
  }

  ngOnInit() {
  }

  users:any;
  mostrarDatos(){
    this.http.mostrarUsuarios().then( 
      (res) => {
        console.log(res);
         this.users=res;
      },
      (error) => {
        console.log("Error" + JSON.stringify(error));
        alert("Verifica que cuentes con internet");
      }
    );
  }

  guardarGasto(){
    console.log(this.idUsuario+', '+this.fecha+', '+this.total+', '+this.descripcion);
    if(this.idUsuario != undefined){
      this.presentAlertRegistrar() //guardar();
    } else {
      this.alerta('Hay campos importantes sin llenar');
    }
  }
  guardar(){
    console.log(this.idUsuario+', '+this.fecha+', '+this.total+', '+this.descripcion);
    this.http.insertarGasto(this.idUsuario,this.fecha,this.total,this.descripcion).then(
      (inv) => {
        console.log(inv);
        var resultado;

        resultado = inv['resultado'];
        if(resultado == "insertado"){
 
          this.mensajeToast("Gasto registrado correctamente.");
          this.route.navigateByUrl('/gastos');
 
        }else{
          this.mensajeToast("A ocurrido un error intenta mas tarde");
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
      duration: 4000
    });
    toast.present();
  }

  async mensajeToast(mensaje:string){
    const toast = await this.toastController.create({
      message: mensaje,
      position: 'top',
      duration: 2000
    });
    toast.present();

  }

  async presentAlertRegistrar() {
    const alert = await this.alertController.create({
      header: 'Confirmación de registro',
      message: '¿Está seguro de registrar el gasto?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Aceptar',
          handler: () => {   
            console.log('Confirm Okay');         
            this.guardar();
          }
        }
      ]
    });

    await alert.present();
  }

}
