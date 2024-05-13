import { Component } from '@angular/core';
import { Productos } from '../../productos';
import { ServicesService } from 'src/app/apiservice/services.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-editar-producto',
  templateUrl: './editar-producto.component.html',
  styleUrls: ['./editar-producto.component.css']
})
export class EditarProductoComponent {
  producto:Productos = new Productos();
  constructor(private serviceAPI:ServicesService, private enrutador:Router, private enruta:ActivatedRoute){}


  ngOnInit():void{
    const id_producto = this.enruta.snapshot.params['id_producto'];
    this.serviceAPI.obtenerPorId(id_producto).subscribe((productosObtenido)=>{
      this.producto = productosObtenido;
    }, (error)=>{
      console.log("Error")
    }
  )
  
  }

  editarProducto(id_producto:number){
    this.serviceAPI.editarProductos(id_producto, this.producto).subscribe(
      (actualizada)=>{
        console.log("Actualizada", actualizada);
        this.irListaUsuarios();
      }, (error)=>{
        console.log("Error", error);
      }
    )
  }

  irListaUsuarios() {
    this.enrutador.navigate(["/productos-lista"])
  }

}
