import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModeloDatos } from 'src/app/modelos/datos.modelo';
import { SeguridadService } from 'src/app/servicios/seguridad.service';
import * as cryptoJS  from "crypto-js";
import { Router } from '@angular/router';

@Component({
  selector: 'app-identificacion',
  templateUrl: './identificacion.component.html',
  styleUrls: ['./identificacion.component.css']
})
export class IdentificacionComponent implements OnInit {
  
  fgValidador: FormGroup = this.fb.group({
    'usuario': ['',[Validators.required, Validators.email]],
    'clave':['',[Validators.required]]

  });
  
  constructor(private fb: FormBuilder,
    private servicioSeguridad: SeguridadService,
    private router: Router
    ){

  }
  ngOnInit(): void{
    
  }

  IdentificarUsuario(){
    let usuario = this.fgValidador.controls["usuario"].value;
    let clave = this.fgValidador.controls["clave"].value;    
    let claveCifrada = cryptoJS.MD5(clave).toString();
    //alert("clave sin cifrar: "+ clave);
    //alert("clave crifrada: "+ claveCifrada);    
    this.servicioSeguridad.Identificar(usuario, claveCifrada).subscribe((datos:any)=>{
       //OK
       alert("datos correctos");
       this.servicioSeguridad.AlmacenarSesion(datos);
       this.router.navigate(['/inicio']);
    }, (error:any)=>{
      //error
      alert("datos inválidos");
      alert(error.message);
    });

    
  }

}