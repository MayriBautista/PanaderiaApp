import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { HttpService } from '../http.service';
import { ActivatedRoute } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-entradas',
  templateUrl: './entradas.page.html',
  styleUrls: ['./entradas.page.scss'],
})
export class EntradasPage implements OnInit {

  fechaC: string = new Date().toISOString();
  fecha: string = this.fechaC;
  t:any;

  constructor(
    private menu: MenuController,
    private activatedRoute: ActivatedRoute,
    public http:HttpService,
    public alertController: AlertController,
    public route: Router, 
    public toastController: ToastController
  ) { 
    this.getEntradas();
    this.mostrarTotal();
  }

  ngOnInit() {
  }

  doRefresh(event) {
    console.log('Begin async operation');
    this.getEntradas();
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 1000);
  }

  prod:any;
  getEntradas() {
    this.http.getEntradas(this.fecha).then(
      (inv) => {
        console.log(inv);
        this.prod = inv;
      });
  }

  mostrarTotal(){
    this.http.mostrarTotal(this.fecha).then( 
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

  async presentAlertConfirm(p) {
    const alert = await this.alertController.create({
      header: 'Confirmar eliminación de registro',
      message: '¿Está seguro de eliminar de forma permanente?',
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
            this.eliminar(p);
          }
        }
      ]
    });

    await alert.present();
  }

  eliminar(p){
    this.http.eliminarEntrada(p.idEntrada, p.cantidad, p.idProducto).then(
      (inv) => {
        console.log(inv);
        var estado = inv['resultado'];
        if (estado == "eliminado"){
          this.alerta("Eliminado correctamente");
        } else {
          this.alerta("No se pudo eliminar, intente mas tarde");
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

}
