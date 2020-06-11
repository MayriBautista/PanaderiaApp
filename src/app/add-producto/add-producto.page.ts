import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { HttpService } from '../http.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-add-producto',
  templateUrl: './add-producto.page.html',
  styleUrls: ['./add-producto.page.scss'],
})
export class AddProductoPage implements OnInit {

  tipoProducto:string;
  precio:string;
  descripcion:string;
  
  constructor(
    public http:HttpService,
    public alertController: AlertController,
    public route: Router, 
    public toastController:ToastController
    ) { 
       
    }

  ngOnInit() {
  }

  existeProducto(){
    this.http.existeProducto(this.tipoProducto).then(
      (inv) => {
        console.log(inv);
        var estado = inv['resultado'];
        if (estado == "existe"){
          this.alerta("El producto ya existe");
        } else {
          this.guardarProducto();
        }
      },
      (error) => {
        console.log("Error" + JSON.stringify(error));
        alert("Verifica que cuentes con internet");
      }
    );
  }

  guardarProducto(){
    console.log(this.tipoProducto+', '+this.descripcion+', '+this.precio);
    if(this.tipoProducto != undefined && this.precio != undefined){
      this.presentAlertRegistrar() //guardar();
    } else {
      this.alerta('Hay campos importantes sin llenar');
    }
  }
  guardar(){
    console.log(this.tipoProducto+', '+this.descripcion+', '+this.precio);
    this.http.insertarProducto(this.tipoProducto,this.descripcion,this.precio,).then(
      (inv) => {
        console.log(inv);
        var resultado;

        resultado = inv['resultado'];
        if(resultado == "insertado"){
 
          this.mensajeToast("Producto registrado correctamente.");
          this.route.navigateByUrl('/productos');
 
        }else{
          this.mensajeToast("A ocurrido un error intenta mas tarde");
          this.route.navigateByUrl('/add-producto');
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
      message: '¿Está seguro de registrar '+this.tipoProducto+'?',
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
