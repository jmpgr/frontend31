import {CuentaLinks} from './cuenta-links';

export interface Cuenta {
  id: number;
  iban: string;
  usuario: string;
  _links: CuentaLinks;

}
