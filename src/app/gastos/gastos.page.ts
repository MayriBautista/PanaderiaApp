import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-gastos',
  templateUrl: './gastos.page.html',
  styleUrls: ['./gastos.page.scss'],
})
export class GastosPage implements OnInit {

  fechaC: string = new Date().toISOString();
  fecha: string = this.fechaC;
  t:any;

  constructor(
    public http:HttpService,
    public alertController: AlertController,
    public route: Router, 
    public toastController: ToastController
  ) { 
    this.getGasto();
    this.mostrarTotalG();
  }

  ngOnInit() {
  }

  doRefresh(event) {
    console.log('Begin async operation');
    this.getGasto();
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 500);
  }

  gastos:any;
  getGasto() {
    this.http.getGasto().then(
      (inv) => {
        console.log(inv);
        this.gastos = inv;
      });
  }

  mostrarTotalG(){
    this.http.mostrarTotalG().then( 
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

  async presentAlertEliminar(gasto) {
    const alert = await this.alertController.create({
      header: 'Confirmar eliminación de registro',
      message: '¿Está seguro de eliminar de forma permanente el gasto?',
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
            this.eliminar(gasto);
          }
        }
      ]
    });

    await alert.present();
  }

  eliminar(gasto){
    this.http.eliminarGasto(gasto.idGasto).then(
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

  async actualizar( gasto ) {
    let alert = this.alertController.create({
      header: 'Actualizar',
      inputs: [
        {
          label: 'Descripción',
          name: 'descripcion',
          placeholder: 'Descripción',
          value: gasto.descripcion,
          type: 'text'
        },   
        {
          label:'Total',
          name: 'total',
          placeholder: 'Total',
          value: gasto.total,
          type: 'text'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            console.log('Cancelar');
          }
        },
        {
          text: 'Guardar',
          handler: data => {
            this.modificar(data.descripcion,data.total,gasto.idGasto);
          }
        }
      ]
    });
    (await alert).present();
  }

  modificar(descripcion,total,idGasto){
    this.http.updateGasto(descripcion,total,idGasto).then(
      (inv) => {
        console.log(inv);
        var estado = inv['resultado'];
        if (estado == "actualizado"){
          this.alerta("Actualizado con éxito.");
          this.getGasto();
        } else {
          this.alerta("No se pudo modificar, intente mas tarde");
        }
      },
      (error) => {
        console.log("Error" + JSON.stringify(error));
        alert("Verifica que cuentes con internet");
      }
    );
  }

}
