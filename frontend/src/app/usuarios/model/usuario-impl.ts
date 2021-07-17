import {Usuario} from './usuario';
import {Links} from '../../core/model/links';

export class UsuarioImpl implements Usuario {
  cuentasUrl: string;
  id: number;
  nombre: string;
  _links: Links;

  constructor() {
  }


}
