import { NotificacionService } from './../../services/notifacion/notificacion.service';
import { UsuarioService } from './../../services/usuarios/usuario.service';
import { ValidadoresService } from './../../services/validadores/validadores.service';
import { UsuarioNuevoModel } from './../../models/nuevoUsuario.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LegendaType } from './../../enums/legendas.enum';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-alta-usuarios',
  templateUrl: './alta-usuarios.component.html',
  styleUrls: ['./alta-usuarios.component.css']
})
export class AltaUsuariosComponent implements OnInit {

  altaUsuario: string = LegendaType.AltaUsuario;

  usuario: UsuarioNuevoModel = new UsuarioNuevoModel(null,null,null,null,null, null);

  // Formulario
  forma: FormGroup;

  constructor(
    private fb: FormBuilder,
    private validadoresService: ValidadoresService,
    private usuarioService: UsuarioService,
    private notificacionService: NotificacionService
  ) {
    this.onCrearFormulario();
  }

  ngOnInit(): void {
  }

  onCrearFormulario() {
    this.forma = this.fb.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")], this.validadoresService.existeCorreo],
      password: ['', Validators.required],
      password2: ['', Validators.required],
      nombreUsuario: ['', Validators.required, this.validadoresService.existeNombreUsuario],
      rol: ['', Validators.required]
    }, {
      validators: this.validadoresService.passwordsIguales('password','password2')
    })
  }

  get nombreNoValido() { return this.forma.get('nombre').invalid && this.forma.get('nombre').touched; }
  get emailNoValido() { return this.forma.get('email').invalid && this.forma.get('email').touched; }
  get passwordNoValido() { return this.forma.get('password').invalid && this.forma.get('password').touched; } // Validamos que tenga información
  get nombreUsuarioNoValido() { return this.forma.get('nombreUsuario').invalid && this.forma.get('nombreUsuario').touched; }
  // Validacion de contraseña
  get password2NoValido() {
    const pass1 = this.forma.get('password').value;
    const pass2 = this.forma.get('password2').value;

    return (pass1 == pass2) ? false : true;
    //return this.forma.get('password2').invalid && this.forma.get('password2').touched;
  }

  // get existeCorreo() { return this.forma.get('email').errors['existe']; }
  // get existeNombreUsuraio() { return this.forma.get('nombreUsuario').errors['existe']; }

  markAllTouched() {
    if (this.forma.invalid) {
      Object.values( this.forma.controls ).forEach( control => {
        control.markAllAsTouched();
      })
    }
  }

  oAltaUsuario() {
    // console.log(this.forma);
    // console.log(this.asignarValores());
    if (this.forma.invalid) { this.markAllTouched(); return; }
    this.usuarioService.onAltaUsuario(this.asignarValores())
    .subscribe(usuario => {
      // console.log(usuario);
      this.enviarCorreo(usuario);
    })

  }

  asignarValores(): UsuarioNuevoModel {
    let roles: string[] = [];
    roles.push(this.forma.get('rol').value);
    this.usuario = new UsuarioNuevoModel(
      null,
      this.forma.get('nombre').value,
      this.forma.get('nombreUsuario').value,
      this.forma.get('email').value,
      this.forma.get('password').value,
      roles
    )
    return this.usuario;
  }

  enviarCorreo(usuario: UsuarioNuevoModel) {
    this.notificacionService.enviarCorreoDeAltaUusarioTSMO(usuario)
    .subscribe(response => {
      // console.log(response);
    })
  }

}
