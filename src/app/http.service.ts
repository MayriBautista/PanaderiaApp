import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';//IMPORTAR

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(public http: HttpClient) { }

  httpConexion = "http://127.0.0.1:8000/";

  //LOGIN
  login(nombre: string, contra: string) {
    var url = this.httpConexion + 'login/' + nombre + '/' + contra;
    return new Promise((resolve, reject) => {
      this.http.get(url)
        .subscribe(data => {
          resolve(data);
        }, (err) => {
          reject(err);
        });
    });
  }

  //INICIO
  mostrarProductos() {
    var url = this.httpConexion + 'mostrarProductos/';
    return new Promise((resolve, reject) => {
      this.http.get(url)
        .subscribe(data => {
          resolve(data);
        }, (err) => {
          reject(err);
        });
    });
  }

  mostrarProducto(idProducto: string) {
    var url = this.httpConexion + 'mostrarProducto/' + idProducto + '/';
    return new Promise((resolve, reject) => {
      this.http.get(url)
        .subscribe(data => {
          resolve(data);
        }, (err) => {
          reject(err);
        });
    });
  }

  mostrarVenta(idVenta: string) {
    var url = this.httpConexion + 'mostrarVenta/' + idVenta + '/';
    return new Promise((resolve, reject) => {
      this.http.get(url)
        .subscribe(data => {
          resolve(data);
        }, (err) => {
          reject(err);
        });
    });
  }

  getVenta(idVenta: string) {
    var url = this.httpConexion + 'getVenta/' + idVenta + '/';
    return new Promise((resolve, reject) => {
      this.http.get(url)
        .subscribe(data => {
          resolve(data);
        }, (err) => {
          reject(err);
        });
    });
  }

  getNewID() {
    var url = this.httpConexion + 'getNewID/';
    return new Promise((resolve, reject) => {
      this.http.get(url)
        .subscribe(data => {
          resolve(data);
        }, (err) => {
          reject(err);
        });
    });
  }

  registrarVentaP(idVenta:string, idProducto: string, cantidad: string, precio: string, subtotal: string) {
    var url = this.httpConexion + 'registrarVentaP/' + idVenta+ '/' + idProducto+ '/' + cantidad+ '/' + precio+ '/' + subtotal;
    return new Promise((resolve, reject) => {
      this.http.get(url)
        .subscribe(data => {
          resolve(data);
        }, (err) => {
          reject(err);
        });
    });
  }

  nuevaVenta(idVenta:string, idUsuario: string, fecha: string, total: string) {
    var url = this.httpConexion + 'nuevaVenta/' + idVenta+ '/' + idUsuario+ '/' + fecha+ '/' + total;
    return new Promise((resolve, reject) => {
      this.http.get(url)
        .subscribe(data => {
          resolve(data);
        }, (err) => {
          reject(err);
        });
    });
  }

  //USUARIOS
  insertar(nombre: string, telefono: string, contrasena: string, tipoUsuario: string) {
    var url = this.httpConexion + 'registro/' + nombre + '/' + telefono+ '/' + contrasena+ '/' + tipoUsuario;
    return new Promise((resolve, reject) => {
      this.http.get(url)
        .subscribe(data => {
          resolve(data);
        }, (err) => {
          reject(err);
        });
    });
  }

  mostrarUsuarios() {
    var url = this.httpConexion + 'mostrarUsuarios/';
    return new Promise((resolve, reject) => {
      this.http.get(url)
        .subscribe(data => {
          resolve(data);
        }, (err) => {
          reject(err);
        });
    });
  }

  eliminarUsuario(idUsuario: string) {
    var url = this.httpConexion + 'eliminarUsuario/' + idUsuario;
    return new Promise((resolve, reject) => {
      this.http.get(url)
        .subscribe(data => {
          resolve(data);
        }, (err) => {
          reject(err);
        });
    });
  }

  updateU(nombre: string, telefono: string, contrasena: string, tipoUsuario: string, idUsuario:string) {
    var url = this.httpConexion + 'updateUsuario/' + nombre + '/' + telefono + '/' + contrasena + '/' + tipoUsuario + '/' + idUsuario + '/';
    return new Promise((resolve, reject) => {
      this.http.get(url)
        .subscribe(data => {
          resolve(data);
        }, (err) => {
          reject(err);
        });
    });
  }

  //Productos
  eliminarProducto(idProducto: string) {
    var url = this.httpConexion + 'eliminarProducto/' + idProducto;
    return new Promise((resolve, reject) => {
      this.http.get(url)
        .subscribe(data => {
          resolve(data);
        }, (err) => {
          reject(err);
        });
    });
  }

  insertarProducto(tipoProducto: string, descripcion: string, precio: string, stock = 0) {
    var url = this.httpConexion + 'registroProducto/' + tipoProducto + '/' + descripcion + '/' + precio + '/' + stock;
    return new Promise((resolve, reject) => {
      this.http.get(url)
        .subscribe(data => {
          resolve(data);
        }, (err) => {
          reject(err);
        });
    });
  }

  existeProducto(tipoProducto: string) {
    var url = this.httpConexion + 'existeProducto/'+ tipoProducto;
    return new Promise((resolve, reject) => {
      this.http.get(url)
        .subscribe(data => {
          resolve(data);
        }, (err) => {
          reject(err);
        });
    });
  }

  updateProducto(tipoProducto: string, descripcion: string, precio: string, idUsuario:string) {
    var url = this.httpConexion + 'updateProducto/' + tipoProducto + '/' + descripcion + '/' + precio + '/' + idUsuario + '/';
    return new Promise((resolve, reject) => {
      this.http.get(url)
        .subscribe(data => {
          resolve(data);
        }, (err) => {
          reject(err);
        });
    });
  }

  //ENTRADAS $idProducto,$cantidad,$precio,$fecha,$total
  insertarEntrada(idProducto: string, cantidad: string, precio: string, fecha: string, total: string) {
    var url = this.httpConexion + 'registroEntrada/' + idProducto + '/' + cantidad + '/' + precio + '/' + fecha+ '/' + total;
    return new Promise((resolve, reject) => {
      this.http.get(url)
        .subscribe(data => {
          resolve(data);
        }, (err) => {
          reject(err);
        });
    });
  }

  getEntradas(fecha: string) {
    var url = this.httpConexion + 'getEntradas/' + fecha + '/';
    return new Promise((resolve, reject) => {
      this.http.get(url)
        .subscribe(data => {
          resolve(data);
        }, (err) => {
          reject(err);
        });
    });
  }

  mostrarTotal(fecha:string) {
    var url = this.httpConexion + 'mostrarTotal/'+ fecha;
    return new Promise((resolve, reject) => {
      this.http.get(url)
        .subscribe(data => {
          resolve(data);
        }, (err) => {
          reject(err);
        });
    });
  }

  eliminarEntrada(idEntrada: string, cantidad: string, idProducto: string) {
    var url = this.httpConexion + 'eliminarEntrada/' + idEntrada + '/' + cantidad + '/' + idProducto;
    return new Promise((resolve, reject) => {
      this.http.get(url)
        .subscribe(data => {
          resolve(data);
        }, (err) => {
          reject(err);
        });
    });
  }

  //GASTOS
  mostrarGastos() {
    var url = this.httpConexion + 'mostrarG/';
    return new Promise((resolve, reject) => {
      this.http.get(url)
        .subscribe(data => {
          resolve(data);
        }, (err) => {
          reject(err);
        });
    });
  }

  getGasto(fecha: string) {
    var url = this.httpConexion + 'getGasto/' + fecha + '/';
    return new Promise((resolve, reject) => {
      this.http.get(url)
        .subscribe(data => {
          resolve(data);
        }, (err) => {
          reject(err);
        });
    });
  }

  eliminarGasto(idGasto: string) {
    var url = this.httpConexion + 'eliminarGasto/' + idGasto;
    return new Promise((resolve, reject) => {
      this.http.get(url)
        .subscribe(data => {
          resolve(data);
        }, (err) => {
          reject(err);
        });
    });
  }

  updateGasto(descripcion: string, idUsuario: string, total: string, idGasto:string) {
    var url = this.httpConexion + 'updateGasto/' + descripcion + '/' + idUsuario + '/' + total + '/' + idGasto + '/';
    return new Promise((resolve, reject) => {
      this.http.get(url)
        .subscribe(data => {
          resolve(data);
        }, (err) => {
          reject(err);
        });
    });
  }

  insertarGasto(idUsuario: string, fecha: string, total: string, descripcion: string) {
    var url = this.httpConexion + 'registroGasto/' + idUsuario + '/' + fecha+ '/' + total+ '/' + descripcion;
    return new Promise((resolve, reject) => {
      this.http.get(url)
        .subscribe(data => {
          resolve(data);
        }, (err) => {
          reject(err);
        });
    });
  }

  mostrarTotalG(fecha:string) {
    var url = this.httpConexion + 'mostrarTotalG/'+ fecha;
    return new Promise((resolve, reject) => {
      this.http.get(url)
        .subscribe(data => {
          resolve(data);
        }, (err) => {
          reject(err);
        });
    });
  }
}
