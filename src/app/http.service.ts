import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';//IMPORTAR

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(public http: HttpClient) { }

  httpConexion = "http://127.0.0.1:8000/";

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

}
