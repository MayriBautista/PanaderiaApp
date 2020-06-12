import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { HttpService } from '../http.service';
import { ActivatedRoute } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-add-pedido',
  templateUrl: './add-pedido.page.html',
  styleUrls: ['./add-pedido.page.scss'],
})
export class AddPedidoPage implements OnInit {

  fechaC: string = new Date().toISOString();
  fecha: string = this.fechaC;
  estado: any = "No entregado";
  idProducto:string;
  precio:string;
  productos:any;
  hora:string;
  cantidad:string;
  total:string;
  notas:string;

  constructor(
    public http:HttpService,
    public alertController: AlertController,
    public route: Router, 
    public toastController: ToastController
  ) {
    this.mostrarDatos();
  }

  ngOnInit() {
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

  guardarPedido(){
    console.log(this.idProducto+', '+this.hora+', '+this.fecha+', '+this.cantidad+', '+this.precio+', '+this.total+', '+this.notas+', '+this.estado);
    if(this.idProducto != undefined){
      this.presentAlertRegistrar() //guardar();
    } else {
      this.alerta('Hay campos importantes sin llenar');
    }
  }
  guardar(){
    console.log(this.idProducto+', '+this.hora+', '+this.fecha+', '+this.cantidad+', '+this.precio+', '+this.total+', '+this.notas+', '+this.estado);
    this.http.insertarPedido(this.idProducto,this.hora,this.fecha,this.cantidad,this.precio,this.total,this.notas,this.estado).then(
      (inv) => {
        console.log(inv);
        var resultado;

        resultado = inv['resultado'];
        if(resultado == "insertado"){
 
          this.mensajeToast("Pedido registrado correctamente.");
          this.route.navigateByUrl('/pedidos');
 
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
      message: '¿Está seguro de registrar el pedido?',
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
