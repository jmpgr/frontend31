import {Links} from '../../core/model/links';

export interface Usuario{
  id: number;
  nombre: string;
  cuentasUrl: string;
  _links: Links;
}
