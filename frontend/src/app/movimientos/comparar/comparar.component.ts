import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CuentaService} from '../../cuentas/service/cuenta.service';
import {Cuenta} from '../../cuentas/models/cuenta';
import {Movimientos} from '../../cuentas/models/movimiento';
import {CategoriaService} from '../../categorias/service/categoria.service';
import {Categoria} from '../../categorias/models/categoria';
import {Observable} from 'rxjs';
import {UsuarioService} from '../../usuarios/service/usuario.service';
import {Usuario} from '../../usuarios/model/usuario';

@Component({
  selector: 'app-comparar',
  templateUrl: './comparar.component.html',
  styles: []
})
export class CompararComponent implements OnInit {

  formularioBusqueda: FormGroup;
  cuenta1: Cuenta;
  cuenta2: Cuenta;
  movimientos1: Movimientos = new Movimientos();
  movimientos2: Movimientos = new Movimientos();

  categorias: Categoria[] = [];
  cuentas: Cuenta[] = [];
  usuarios: Usuario[] = [];

  constructor(private cuentaService: CuentaService,
              private categoriaService: CategoriaService,
              private usuarioService: UsuarioService) {
    this.formularioBusqueda = new FormGroup({
      usuario1: new FormControl(''),
      usuario2: new FormControl('', Validators.required),
      categoria: new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {
    this.getCategorias();
    this.cargarUsuarios();
  }

  getCategorias(): void {
    this.categoriaService.getCategorias()
      .subscribe(response => {
        this.categorias = this.categoriaService.extraerCategorias(response);
        console.log(response);
      });
  }

  buscarMovimientos(): void {
    let valores = this.formularioBusqueda.value;
    this.movimientos1 = new Movimientos();
    this.movimientos2 = new Movimientos();
    this.getMovimientos(valores.categoria, valores.usuario1).subscribe(r => {
      this.movimientos1 = this.cuentaService.extraerMovimiento(r);
    });
    this.getMovimientos(valores.categoria, valores.usuario2).subscribe(r => {
      this.movimientos2 = this.cuentaService.extraerMovimiento(r);
    });
  }

  getMovimientos(categoria: string, idUsuario: string): Observable<any> {
    return this.cuentaService.getMovimientosPorCategoria(categoria, idUsuario);
  }

  cargarUsuarios(): void {
    this.usuarioService.getUsuarios().subscribe(respose => {
      this.usuarios = this.usuarioService.extraerUsuarios(respose)
    });
  }
 /*  sumarGastos1(movimientos: Movimientos):Number{
    return this.movimientos1.gastos.reduce((acum, g)=> acum+ g.importe,0)
   }
   sumarIngresos1(movimientos:Movimientos):Number{
     return this.movimientos1.ingresos.reduce((acum, g)=> acum+ g.importe,0)
   }
   sumarGastos2(movimientos: Movimientos):Number{
     return this.movimientos2.gastos.reduce((acum, g)=> acum+ g.importe,0)
    }
    sumarIngresos2(movimientos:Movimientos):Number{
      return this.movimientos2.ingresos.reduce((acum, g)=> acum+ g.importe,0)
    } */
}
