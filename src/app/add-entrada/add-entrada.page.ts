import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { HttpService } from '../http.service';
import { ActivatedRoute } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-add-entrada',
  templateUrl: './add-entrada.page.html',
  styleUrls: ['./add-entrada.page.scss'],
})
export class AddEntradaPage implements OnInit {
  fechaC: string = new Date().toISOString();
  fecha: string = this.fechaC;
  productos:any;  
  precio:any;
  cantidad:any = "1";
  idProducto:string;
  notas:string;

  constructor(
    private menu: MenuController,
    private activatedRoute: ActivatedRoute,
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

  mostrarP(idProducto){
    this.http.mostrarProducto(idProducto).then(
      (inv) => {
        console.log(inv);
        var precio = inv['precio'];

        this.precio = inv['precio'];
      },
      (error) => {
        console.log("Error" + JSON.stringify(error));
        alert("Verifica que cuentes con internet");
      }
    );
  }

  insertarEntrada(idProducto){
    //ENTRADAS $idProducto,$cantidad,$precio,$fecha,$total
    var total;
    total = this.precio * this.cantidad;
    console.log(total);
    console.log(idProducto+', '+this.cantidad+', '+this.precio+', '+this.fecha+', '+total);
    this.http.insertarEntrada(idProducto,this.cantidad,this.precio,this.fecha,total).then(
      (inv) => {
        console.log(inv);
        var resultado;

        resultado = inv['resultado'];
        if(resultado == "insertado"){
          this.presentAlert(total);
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

  async presentAlert(total) {
    const alert = await this.alertController.create({
      header: 'Total',
      message: 'El total de la entrada es: '+total,
      buttons: [
        {
          text: 'Aceptar',
          handler: () => {   
            console.log('Confirm Okay');   
            this.route.navigateByUrl('/entradas');
          }
        }
      ]
    });

    await alert.present();
  }

}
