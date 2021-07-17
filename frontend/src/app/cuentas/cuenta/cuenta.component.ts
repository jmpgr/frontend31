import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {CuentaImpl} from '../models/cuenta-impl';
import {CuentaService} from '../service/cuenta.service';
import {UsuarioImpl} from '../../usuarios/model/usuario-impl';
import {UsuarioService} from '../../usuarios/service/usuario.service';

@Component({
  selector: 'app-cuenta',
  templateUrl: './cuenta.component.html',
  styles: []
})
export class CuentaComponent implements OnInit {

  formularioAltaCuenta: FormGroup;
  usuarios: UsuarioImpl[] = [];

  constructor(private cuentasService: CuentaService,
              private router: Router,
              private usuarioService: UsuarioService) {

    this.formularioAltaCuenta = new FormGroup({
      iban: new FormControl(''),
      usuario: new FormControl('')
    });
  }

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  crearCuenta(): void {
    const jSonAltaCuenta = this.formularioAltaCuenta.value;
    let cuenta = new CuentaImpl();
    cuenta.iban = jSonAltaCuenta.iban;
    cuenta.usuario = jSonAltaCuenta.usuario;
    this.cuentasService.crearCuenta(cuenta).subscribe(value => {
      this.formularioAltaCuenta.reset();
      this.router.navigate(['/cuentas']);
    });

  }


  cargarUsuarios(): void {
    this.usuarioService.getUsuarios().subscribe(respose => this.usuarios = this.usuarioService.extraerUsuarios(respose));
  }
}
