import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { HttpService } from '../http.service';
import { ActivatedRoute } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-home-empleado',
  templateUrl: './home-empleado.page.html',
  styleUrls: ['./home-empleado.page.scss'],
})
export class HomeEmpleadoPage implements OnInit {

  fechaC: string = new Date().toISOString();
  fecha: string = this.fechaC;
  tipoProducto:string;
  idProducto:string;
  idUsuario:string;
  descripcion:string;
  idVenta:any;
  precio:any;
  vprecio:string;
  cantidad:any = "1";
  productos:any;  
  venta:any;  
  datos:any;
  id:string;
  total:any;
  subtotal:any;

  constructor(
    private menu: MenuController,
    private activatedRoute: ActivatedRoute,
    public http:HttpService,
    private storage: Storage,
    public alertController: AlertController,
    public route: Router, 
    public toastController: ToastController
  ) { 
    storage.get("idUsuario").then((val) => {
      console.log('idUsuario', val);
      this.idUsuario = val;
    });
    this.storage.get('idVenta').then((val)=> {
      console.log('idVenta',val);
      this.idVenta = val;
      this.getNewID();
      this.getVenta(this.idVenta);
    });
    this.mostrarDatos();
    this.getVenta(this.idVenta);
  }

  ngOnInit() {
  }
  
  ionViewWillenter() {
    this.getNewID();
  }

  ionViewWillLeave() {
    this.getNewID();
    this.mostrarDatos();
    this.precio=null;
    this.cantidad= "1";
  }

  ionViewWillPre() {
    this.mostrarDatos();
    this.precio=null;
    this.cantidad= "1";
  }

  doRefresh(event) {
    console.log('Begin async operation');
    this.nuevaVenta(this.idVenta);
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 1000);
  }

  registrarVentaP(idVenta){
    var sub;
    sub = this.precio * this.cantidad;
    console.log(sub);
    console.log(idVenta+', '+this.idProducto+', '+this.cantidad+', '+this.precio+', '+sub);
    this.http.registrarVentaP(idVenta,this.idProducto,this.cantidad,this.precio,sub).then(
      (inv) => {
        console.log(inv);
        var resultado;

        resultado = inv['resultado'];
        if(resultado == "insertado"){
          this.getVenta(this.idVenta);
          this.ionViewWillPre();
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

  //nuevaVenta/{idVenta}/{idProducto}/{idUsuario}/{fecha}/{cantidad}/{precio}/{total}
  nuevaVenta(idVenta){
    console.log(idVenta+', '+this.idUsuario+', '+this.fecha+', '+this.total);
    this.http.nuevaVenta(idVenta,this.idUsuario,this.fecha,this.total).then(
      (inv) => {
        console.log(inv);
        this.total = inv['total'];
        var resultado;

        resultado = inv['resultado'];
        if(resultado == "insertado"){
          this.presentAlert(this.total);
          this.ionViewWillLeave();
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

  async presentAlert(total) {
    const alert = await this.alertController.create({
      header: 'Total',
      message: 'El total de la compra es: '+total,
      buttons: [
        {
          text: 'Aceptar',
          handler: () => {   
            console.log('Confirm Okay');   
            this.route.navigateByUrl('/inicio');
          }
        }
      ]
    });

    await alert.present();
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

  prod:any;
  getVenta(idVenta) {
    this.http.getVenta(idVenta).then(
      (inv) => {
        console.log(inv);
        this.prod = inv;
      });
  }

  getNewID(){
    this.http.getNewID().then( 
      (inv) => {
        console.log(inv);
         this.idVenta=inv['idVenta'];
         this.getVenta(this.idVenta);
      },
      (error) => {
        console.log("Error" + JSON.stringify(error));
        alert("Verifica que cuentes con internet");
      }
    );
  }

  openFirst() {
    console.log("click OpenFirst");
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }

  irA(vinculo:string){
    console.log(vinculo);

    this.route.navigateByUrl(vinculo);
  }

  eliminarSV(p){
    this.http.eliminarSV(p.idSVenta, p.cantidad, p.idProducto).then(
      (inv) => {
        console.log(inv);
        var estado = inv['resultado'];
        if (estado == "eliminado"){
          this.alerta("Eliminado correctamente");
          this.getVenta(this.idVenta);
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

}
