import { Vista } from './../../../enums/vista.enum';
import { Router } from '@angular/router';
import { NotificacionService } from './../../../services/notifacion/notificacion.service';
import { EnvioService } from './../../../services/envio/envio.service';
import { DocumentacionService } from './../../../services/documentacion/documentacion.service';
import { EnvioDto } from './../../../models/dto/EnvioDto.model';
import { DocumentacionDto } from 'src/app/models/dto/DocumentacionDto.model';
import { ToastrService } from 'ngx-toastr';
import { PagoService } from './../../../services/pago/pago.service';
import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

const APROBADO = "APROBADO";
const RECHAZADO = "RECHAZADO";
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {



  @Input() id;
  @Input() nombre;
  @Input() descripcion;
  @Input() precio;
  @Input() envio: EnvioDto;
  @Input() documentacion: DocumentacionDto;
  @Input() proveedor: string;

  loadingConfirmar: boolean = false;

  constructor(
    public activeModal: NgbActiveModal,
    private pagoService: PagoService,
    private toastrService: ToastrService,
    private documentacionService: DocumentacionService,
    private envioService: EnvioService,
    private notificacionService: NotificacionService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // console.log('Entra a ventana de modal');
    // console.log(this.documentacion);
    // console.log(this.proveedor);
    // console.log(window.location.pathname);
  }

  confirmar(id: string): void {
    this.loadingConfirmar = true;
    this.pagoService.confirmar(id).subscribe(
      response => {
        this.toastrService.success
        ('Pago confirmado', 'Se ha confirmado el pago con id ' + response['id'], {positionClass: 'toast-top-center', timeOut: 3000})
        this.solicitarGuiaProveedor();
        this.router.navigate([Vista.EXITO]);
        this.activeModal.close();
      },
      error => {
        // console.log(error);
        this.activeModal.close();
      }
    )
  }

  cancelar(id: string): void {
    this.pagoService.cancelar(id).subscribe(
      response => {
        this.toastrService.success
        ('Pago cancelado', 'Se ha cancelado el pago con id ' + response['id'], {positionClass: 'toast-top-center', timeOut: 3000})
        this.activeModal.close();
      },
      error => {
        // console.log(error);
        this.activeModal.close();
      }
    )
  }

  solicitarGuiaProveedor() {
    // console.log(this.proveedor);
    // console.log(this.envio);
    if (this.proveedor == 'ENVIA') {
      this.documentacionService.obtenerGuiaProveedor(this.documentacion)
      .subscribe(guia => {
        // console.log("Guia: ",guia);
        this.envio.guiaProveedor = guia;
        this.envio.pago = this.id;
        this.envioService.setGuia(guia);
        // console.log(this.envio);
        this.cambiarEstadoPago(APROBADO, this.envio)
      }, error => {
        this.envio.pago = this.id;
        this.cambiarEstadoPago(RECHAZADO, this.envio)
        alert(error['error']);
      } )
    } else {
      this.cambiarEstadoPago(APROBADO, this.envio);
    }
  }

  cambiarEstadoEnvio(estadoEnvio: string, envio: EnvioDto) {
    this.envioService.actualizarEstado(estadoEnvio, envio)
    .subscribe(response => {
      // console.log(response);
    }, error => {
      alert(error['error']);
    } )
  }

  cambiarEstadoPago(estadoPago: string, envio: EnvioDto) {
    // console.log(envio)
    this.envioService.actualizarEstadoPago(estadoPago, envio)
    .subscribe(envio => {
      // console.log("Resposne CambiarEstado Pago: ",envio);
      if (estadoPago == APROBADO) {
        this.notificarCorreo(envio);
      }
      // console.log(envio);
    }, error => {
      alert(error['error']);
    } )
  }

  notificarCorreo(envio: EnvioDto) {
    this.notificacionService.enviarCorreoDeEnvio(envio)
    .subscribe(response => {
      console.log(response);
    }, error => {
      console.log(error);
    })
  }

}
