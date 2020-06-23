import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.page.html',
  styleUrls: ['./ventas.page.scss'],
})
export class VentasPage implements OnInit {

  productos:any;
  ventas:any;

  constructor(
    public http:HttpService,
    public alertController: AlertController,
    public route: Router, 
    public toastController: ToastController
  ) { 
    this.mostrarDatos();
    this.ventasTotales();
    this.mostrarTotalV();
  }

  ngOnInit() {
  }

  doRefresh(event) {
    console.log('Begin async operation');
    this.mostrarDatos();
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 500);
  }

  mostrarDatos(){
    this.http.mostrarProductos().then( 
      (res) => {
        console.log(res);
         this.productos=res;
      },
      (error) => {
        console.log("Error" + JSON.stringify(error));
        alert("Verifica que cuentes con internet");
      }
    );
  }

  eliminarDatos(){
    this.http.eliminarVentas().then( 
      (inv) => {
        console.log(inv);
        var estado = inv['resultado'];
        if (estado == "eliminado"){
          this.alerta("Eliminado correctamente");
          this.ventasTotales();
          this.mostrarTotalV();
          this.mostrarDatos();
        } else {
          this.ventasTotales();
          this.mostrarTotalV();
          this.mostrarDatos();
          //this.alerta("No se pudo eliminar, intente mas tarde");
        }
      }, 
      (error) => {
        console.log("Error" + JSON.stringify(error));
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

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: 'Las ventas se eliminan una vez que se han terminado todos los productos',
      message: '¿Está seguro de que se han terminado todos los productos? De lo contrario se eliminarán todas las entradas.',
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
            this.eliminarDatos();
          }
        }
      ]
    });

    await alert.present();
  }

  ventasTotales(){
    this.http.ventasTotales().then( 
      (res) => {
        console.log(res);
         this.ventas=res;
      },
      (error) => {
        console.log("Error" + JSON.stringify(error));
        alert("Verifica que cuentes con internet");
      }
    );
  }

  t:any;
  mostrarTotalV(){
    this.http.mostrarTotalV().then( 
      (res) => {
        console.log(res);
        this.t = res;
      },
      (error) => {
        console.log("Error" + JSON.stringify(error));
        alert("Verifica que cuentes con internet");
      }
    );
  }
}
