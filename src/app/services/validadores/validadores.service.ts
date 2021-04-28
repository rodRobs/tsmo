import { UsuarioService } from './../usuarios/usuario.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
import { Injectable } from '@angular/core';


interface ErrorValidate {
  [s:string] : boolean; // Ingresa cualquier cantidad de llaves, y el valor de las llaves sera booleano
}

@Injectable({
  providedIn: 'root'
})
export class ValidadoresService {

  constructor(
    private http: HttpClient,
    private usuarioService: UsuarioService
  ) { }

  passwordsIguales(pass1Name: string, pass2Name: string) {
    return ( formGroup: FormGroup ) => {
      const pass1Control = formGroup.controls[pass1Name];
      const pass2Control = formGroup.controls[pass2Name];

      if (pass1Control.value == pass2Control.value) {
        pass2Control.setErrors(null);
      } else {
        pass2Control.setErrors({noEsIgual: true});
      }
    }
  }

  existeCorreo = (control: FormControl): Promise<any> | Observable<any> => {

    if (!control.value) {
      return Promise.resolve(null);
    }

    return new Promise( ( resolve, reject) => {
      this.usuarioService.onBuscarCorreo(control.value)
      .subscribe(existe => {
        if (existe) {
          console.log('Existe');
          resolve({existe: true});
        } else {
          console.log('No existe');
          resolve(null);
        }
      })
    })

  }

  existeNombreUsuario = (control: FormControl): Promise<any> | Observable<any> => {

    if (!control.value) {
      return Promise.resolve(null);
    }

    return new Promise( ( resolve, reject) => {
      this.usuarioService.onBuscarNombreUsuario(control.value)
      .subscribe(existe => {
        if (existe) {
          resolve({existe: true});
        } else {
          resolve(null);
        }
      })
    })

  }
}
