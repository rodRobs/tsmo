import { EnvioService } from './../../../services/envio/envio.service';
import { Component, Input, OnInit } from '@angular/core';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label, Color } from 'ng2-charts';

interface Fechas {
  inicio: string,
  fin: string
}
@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  styleUrls: ['./dona.component.css']
})
export class DonaComponent implements OnInit {

  public total: number;
  public porcentajes: number[] = [];
  @Input() titulo: string = '';

  // @Input() valorGraficas: MultiDataSet = [];
  @Input() tituloGraficas: Label[] = [];
  // @Input() coloresGraficas: any = [];

  contadorTSMO: number = 0;
  contadorEnvia: number = 0;

  constructor(
    private envioService: EnvioService
  ) {}

  ngOnInit() {
    // console.log(this.valorGraficas);
    // console.log(this.tituloGraficas);
    // console.log(this.coloresGraficas);
    this.total = this.calcularTotal();
    this.porcentajes = this.calcularPorcentaje(this.total);
    this.valoresGrafica(this.titulo);
  }

  // Doughnut
  @Input('labels') doughnutChartLabels: Label[] = ['Recoleccion', 'Camino', 'Entregado', 'Cancelado'];
  // public doughnutChartData: MultiDataSet = this.valorGraficas;
  // public doughnutChartType: ChartType = 'doughnut';

  // public colors: Color[] = this.coloresGraficas;

  // public doughnutChartLabels: Label[] = ['Recoleccion', 'Camino', 'Entregado', 'Cancelado'];
  @Input('valorGraficas') doughnutChartData: MultiDataSet = [
    // [this.contadorTSMO, this.contadorEnvia],
  ];
  public doughnutChartType: ChartType = 'doughnut';
  public pieChartType: ChartType = 'pie';

  @Input('coloresGraficas') colors: Color[] = [
    { backgroundColor: ['#F8FFE5', '#1B9AAA', '#06D6A0', '#EF476F'] }
  ];


  calcularTotal(): number {
    let total = 0;
    // console.log(`${this.titulo}:${this.doughnutChartData}`);
    this.doughnutChartData.forEach( data => {
      data.forEach ( dato => {
        // conole.log('Calcular Total: ', total);
        total = total + dato;
      })
    })
    return total;
  }

  calcularPorcentaje(total: number): number[] {
    let porcentaje: number[]= [];
    // let total: number = this.calcularTotal();
    this.doughnutChartData.forEach( data => {
      data.forEach ( dato => {
        // console.log('Calcular Pocentaje: ', dato);
        porcentaje.push(dato/total);
      })
    })
    return porcentaje;
  }

  // public colors: Color[] = [
  //   { backgroundColor: this.coloresGraficas }
  // ];

  valoresGrafica(titulo: string) {
    switch(titulo) {
      case 'Envios':
        let fechas: Fechas = this.asignarFechas();
        this.conteoProveedor('TSMO', fechas);
        this.conteoProveedor('TSME', fechas);
        break;
      case '':
        break;
    }
  }

  asignarFechas(): Fechas {
    let today = new Date();

    // Agregar mes
    let nextMonth: any = today.getMonth() + 1;
    if (nextMonth >= 10) {
      if (nextMonth == 13) {
        nextMonth = '01';
      }
    } else {
      nextMonth = '0'+nextMonth;
    }
    let month: any = today.getMonth();
    if (month < 10) {
      month = '0' + month;
    }
    // console.log(`${today.getFullYear()}-${month}-01`);
    // console.log(`${today.getFullYear()}-${nextMonth}-01`);
    return {inicio: `${today.getFullYear()}-${month}-01`, fin: `${today.getFullYear()}-${nextMonth}-01`};
  }

  conteoProveedor(proveedor: string, fechas: Fechas) {
    let respuesta: number;
    this.envioService.contarEnvioProveedorPeriodo(proveedor, fechas.inicio, fechas.fin)
    .subscribe(count => {
      // console.log(`${proveedor}:${count}`);
      switch(proveedor) {
        case 'TSMO':
          // console.log('Entra TSMO'), count;
          this.contadorTSMO = count;
          break;
        case 'TSME':
          // console.log('Entra Envia', count);
          this.contadorEnvia = count;
          break;
      }
      // console.log('Res: ',count);
      // contadorProveedor = count;
      // return count;
    }, error => {
      return 0;
    })
    // return contadorProveedor;
  }

}
