import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.page.html',
  styleUrls: ['./productos.page.scss'],
})
export class ProductosPage implements OnInit {

  constructor(
    public http:HttpService,
    public alertController: AlertController,
    public route: Router, 
    public toastController: ToastController
  ) { 
    this.mostrarDatos();
  }

  doRefresh(event) {
    console.log('Begin async operation');
    this.mostrarDatos();
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 500);
  }

  ngOnInit() {
  }

  productos:any;
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

  async presentAlertConfirm(producto) {
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
            this.eliminar(producto);
          }
        }
      ]
    });

    await alert.present();
  }

  eliminar(producto){
    this.http.eliminarProducto(producto.idProducto).then(
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

  async actualizar( producto ) {
    let alert = this.alertController.create({
      header: 'Actualizar',
      inputs: [
        {
          label: 'Producto',
          name: 'tipoProducto',
          placeholder: 'Producto',
          value: producto.tipoProducto,
          type: 'text'
        },
        {
          label: 'Descripción',
          name: 'descripcion',
          placeholder: 'Descripción',
          value: producto.descripcion,
          type: 'text'
        },
        {
          label:'Precio',
          name: 'precio',
          placeholder: 'Precio',
          value: producto.precio,
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
            this.modificar(data.tipoProducto,data.descripcion,data.precio,producto.idProducto);
          }
        }
      ]
    });
    (await alert).present();
  }

  modificar(tipoProducto,descripcion,precio,idProducto){
    this.http.updateProducto(tipoProducto,descripcion,precio,idProducto).then(
      (inv) => {
        console.log(inv);
        var estado = inv['resultado'];
        if (estado == "actualizado"){
          this.alerta("Actualizado con éxito.");
          this.mostrarDatos();
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
