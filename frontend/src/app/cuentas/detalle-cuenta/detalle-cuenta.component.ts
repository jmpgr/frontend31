import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {CuentaService} from '../service/cuenta.service';
import {ActivatedRoute} from '@angular/router';
import {Cuenta} from '../models/cuenta';
import {Movimientos} from '../models/movimiento';
import {CuentaImpl} from '../models/cuenta-impl';
import {MovimientoService} from '../../movimientos/service/movimiento.service';

@Component({
  selector: 'app-detalle-cuenta',
  templateUrl: './detalle-cuenta.component.html',
  styles: []
})
export class DetalleCuentaComponent implements OnInit {

  formularioAltaCuenta: FormGroup;
  formularioAnadirMovimientos: FormGroup;
  cuentaId: number;
  cuenta: Cuenta;
  movimientos: Movimientos;
  total = 0;
  formData: FormData = new FormData();

  constructor(private cuentasService: CuentaService,
              private movimientoService: MovimientoService,
              private activeRoute: ActivatedRoute) {

    this.movimientos = new Movimientos();
    this.cuenta = new CuentaImpl();
    this.cuentaId = this.activeRoute.snapshot.params.id;
    this.formularioAltaCuenta = new FormGroup({
      iban: new FormControl('')
    });
    this.formularioAnadirMovimientos = new FormGroup({
      fichero: new FormControl('')
    });

  }

  ngOnInit(): void {
    this.getCuenta();
  }

  getCuenta(): void {
    this.cuentasService.getCuenta(this.cuentaId).subscribe(
      response => {
        this.cuenta = response;
        this.formularioAltaCuenta.patchValue({
          iban: response.iban
        });
        this.getMovimientos();
      }
    );
  }

  getMovimientos(): void {
    this.cuentasService.getMovimientosCuenta(this.cuenta._links.movimientos.href)
      .subscribe(r => {
        this.movimientos = this.cuentasService.extraerMovimiento(r);
        this.movimientos.ingresos.forEach(ingreso => this.total = this.total + ingreso.importe);
        this.movimientos.gastos.forEach(gasto => this.total = this.total - gasto.importe);
      });
  }

  modificarCuenta(): void {
    this.cuenta.iban = this.formularioAltaCuenta.value.iban;
    this.cuentasService.modificarCuenta(this.cuenta)
      .subscribe(response => {
        this.ngOnInit();
      });
  }

  cargar(): void {
    this.movimientoService.cargarMovimientos(this.formData, this.cuentaId)
      .subscribe(r => {
        this.ngOnInit()
      });
  }

  ficheroSeleccionado(event): void {
    let fileList: FileList = event.target.files;

    if (fileList.length > 0) {
      let file: File = fileList[0];
      console.log(file.name);
      this.formData.append('file', file, file.name);
    }
  }

}
