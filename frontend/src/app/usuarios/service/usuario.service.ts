import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {Cuenta} from '../../cuentas/models/cuenta';
import {UsuarioImpl} from '../model/usuario-impl';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  urlEndPoint = environment.host + 'usuarios';

  constructor(private http: HttpClient) {
  }

  getUsuarios(): Observable<any>{
    return this.http.get(this.urlEndPoint);
  }

  extraerUsuarios(respuestaApi: any): UsuarioImpl[] {
    const usuarios: UsuarioImpl[] = [];
    respuestaApi._embedded.usuarios.forEach(response => {
      const usuarioMapeado: UsuarioImpl = this.maperarUsuario(response);
      usuarios.push(usuarioMapeado);
    });
    return usuarios;
  }

  maperarUsuario(usuarioApi: UsuarioImpl): UsuarioImpl {
    usuarioApi.id = this.getIdDeUrl(usuarioApi._links.self.href);
    return usuarioApi;
  }

  getIdDeUrl(url: string): number {
    let urlSplit = url.split('/');
    return parseInt(urlSplit.pop());
  }
}
