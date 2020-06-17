import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-all-pedido',
  templateUrl: './all-pedido.page.html',
  styleUrls: ['./all-pedido.page.scss'],
})
export class AllPedidoPage implements OnInit {

  estado: any = "Entregado";

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

  pedidos:any;
  mostrarDatos(){
    this.http.mostrarPedidos().then( 
      (res) => {
        console.log(res);
         this.pedidos=res;
      },
      (error) => {
        console.log("Error" + JSON.stringify(error));
        alert("Verifica que cuentes con internet");
      }
    );
  }

  async presentAlertEntregar(pedido) {
    const alert = await this.alertController.create({
      header: '¿Está seguro de que se ha entregado el producto?',
      message: 'La cantidad de producto se descontará del inventario',
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
            this.pedidoEntregado(pedido);
          }
        }
      ]
    });

    await alert.present();
  }

  pedidoEntregado(pedido){
    console.log(this.estado);
    this.http.pedidoEntregado(this.estado,pedido.idPedido,pedido.cantidad,pedido.idProducto).then(
      (inv) => {
        console.log(inv);
        var resultado;

        resultado = inv['resultado'];
        if(resultado == "insertado"){
 
          this.mensajeToast("Pedido entregado, se ha descontado la cantidad de productos de inventario.");
          this.route.navigateByUrl('/all-pedido');
          this.mostrarDatos();
 
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

  async mensajeToast(mensaje:string){
    const toast = await this.toastController.create({
      message: mensaje,
      position: 'top',
      duration: 2000
    });
    toast.present();

  }

  async alerta(mensaje) {
    const toast = await this.toastController.create({
      message: mensaje,
      position: 'middle',
      duration: 4000
    });
    toast.present();
  }

  async actualizar( pedido ) {
    let alert = this.alertController.create({
      header: 'Actualizar',
      inputs: [
        {
          label: 'Hora',
          name: 'hora',
          placeholder: 'Hora',
          value: pedido.hora,
          type: 'text'
        },
        {
          label:'Fecha',
          name: 'fecha',
          placeholder: 'Fecha',
          value: pedido.fecha,
          type: 'text'
        },
        {
          label:'Cantidad',
          name: 'cantidad',
          placeholder: 'Cantidad',
          value: pedido.cantidad,
          type: 'text'
        },
        {
          label:'Precio',
          name: 'precio',
          placeholder: 'Precio',
          value: pedido.precio,
          type: 'text'
        },
        {
          label:'Total',
          name: 'total',
          placeholder: 'Total',
          value: pedido.total,
          type: 'text'
        },
        {
          label:'Detalles',
          name: 'notas',
          placeholder: 'Detalles',
          value: pedido.notas,
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
            this.modificar(data.hora,data.fecha,data.cantidad,data.precio,data.total,data.notas,pedido.idPedido);
          }
        }
      ]
    });
    (await alert).present();
  }

  modificar(hora,fecha,cantidad,precio,total,notas,idPedido){
    this.http.updatePedido(hora,fecha,cantidad,precio,total,notas,idPedido).then(
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
