import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
//import * as cryptoJs from 'crypto-js';
import { SeguridadService } from 'src/app/servicios/seguridad.service';
const cryptoJS = require("cryptojs");



@Component({
  selector: 'app-identificacion',
  templateUrl: './identificacion.component.html',
  styleUrls: ['./identificacion.component.css']
})
export class IdentificacionComponent implements OnInit {
  fgValidador: FormGroup = this.fb.group({
    'usuario': ['',[Validators.required, Validators.email]],
    'clave': ['',[Validators.required]]
    
  });
  constructor(private fb: FormBuilder,
    private servicioSeguridad: SeguridadService,
    private router: Router){}

    ngOnInit(): void {
        
    }
    IdentificarUsuario(){
      let usuario = this.fgValidador.controls["usuario"].value;
      let clave = this.fgValidador.controls["clave"].value;
      //alert("Datos recibidos"+ usuario+ " "+ clave);
      let claveCifrada = cryptoJS.MD5(clave);
      this.servicioSeguridad.Identificar(usuario,claveCifrada).subscribe((datos:any) => {
        this.servicioSeguridad.AlmacenarSesion(datos);
        this.router.navigate(['/inicio']);
      }, (error:any) => {
        alert ("Datos Invalidos")

      })
}

}
