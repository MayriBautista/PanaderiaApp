import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.page.html',
  styleUrls: ['./usuarios.page.scss'],
})
export class UsuariosPage implements OnInit {

  nombre:string;
  telefono:string;
  contrasena:string;
  tipoUsuario:string;
  idUsuario:string;

  constructor(
    public http:HttpService,
    public alertController: AlertController,
    public route: Router, 
    public toastController: ToastController) { 
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

  guardarPersona(){
    console.log(this.nombre+', '+this.telefono+', '+this.contrasena+', '+this.tipoUsuario);
    if(this.nombre != undefined && this.telefono != undefined && this.contrasena != undefined && this.tipoUsuario != undefined){
      this.presentAlertRegistrar() //guardar();
    } else {
      this.alerta('Hay campos importantes sin llenar');
    }
  }
  guardar(){
    console.log(this.nombre+', '+this.telefono);
    this.http.insertar(this.nombre,this.telefono,this.contrasena,this.tipoUsuario).then(
      (inv) => {
        console.log(inv);
        var resultado;

        resultado = inv['resultado'];
        if(resultado == "insertado"){
 
          this.mensajeToast("Usuario registrado correctamente.");
          this.route.navigateByUrl('/usuarios');
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

  async presentAlertConfirm(user) {
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
            this.eliminar(user);
          }
        }
      ]
    });

    await alert.present();
  }

  async presentAlertRegistrar() {
    const alert = await this.alertController.create({
      header: 'Confirmación de registro',
      message: '¿Está seguro de registrar al usuario '+this.nombre+'?',
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
            this.guardar();
          }
        }
      ]
    });

    await alert.present();
  }

  users:any;
  mostrarDatos(){
    this.http.mostrarUsuarios().then( 
      (res) => {
        console.log(res);
         this.users=res;
         this.nombre = res['nombre'];
      },
      (error) => {
        console.log("Error" + JSON.stringify(error));
        alert("Verifica que cuentes con internet");
      }
    );
  }

  eliminar(usuario){
    this.http.eliminarUsuario(usuario.idUsuario).then(
      (inv) => {
        console.log(inv);
        var estado = inv['resultado'];
        if (estado == "eliminado"){
          this.alerta("Eliminado correctamente");
          this.mostrarDatos();
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

  async actualizar( user ) {
    let alert = this.alertController.create({
      header: 'Actualizar',
      inputs: [
        {
          label: 'Usuario',
          name: 'nombre',
          placeholder: 'Usuario',
          value: user.nombre,
          type: 'text'
        },
        {
          label: 'Telefóno',
          name: 'telefono',
          placeholder: 'Telefóno',
          value: user.telefono,
          type: 'text'
        },
        {
          label:'Contraseña',
          name: 'contrasena',
          placeholder: 'Contraseña',
          value: user.contrasena,
          type: 'text'
        },
        {
          label: 'Tipo de usuario',
          name: 'tipoUsuario',
          value: user.tipoUsuario,
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
            this.modificar(data.nombre,data.telefono,data.contrasena,data.tipoUsuario,user.idUsuario);
          }
        }
      ]
    });
    (await alert).present();
  }

  modificar(nombre,telefono,contrasena,tipoUsuario,idUsuario){
    this.http.updateU(nombre,telefono,contrasena,tipoUsuario,idUsuario).then(
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
