import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Ingreso} from '../../cuentas/models/Ingreso';
import {Observable} from 'rxjs';
import {Gasto} from '../../cuentas/models/gasto';

@Injectable({
  providedIn: 'root'
})
export class MovimientoService {

  movimientoEndPoint: string = environment.host + 'movimientos/';
  ingresoEndPoint: string = environment.host + 'ingresos/';
  gastosEndPoint: string = environment.host + 'gastos/';

  constructor(private http: HttpClient) {
  }

  crearIngreso(ingreso: Ingreso): Observable<any> {
    return this.http.post(this.ingresoEndPoint, ingreso);
  }

  crearGasto(gasto: Gasto): Observable<any> {
    return this.http.post(this.gastosEndPoint, gasto);
  }

  cargarMovimientos(file: FormData, idCuenta: number): Observable<any> {
    let h = new HttpHeaders();
    h.append('Content-Type', 'multipart/form-data');
    h.append('Accept', 'application/json');
    return this.http.post(this.movimientoEndPoint + `cargar/${idCuenta}`, file);
  }
}
