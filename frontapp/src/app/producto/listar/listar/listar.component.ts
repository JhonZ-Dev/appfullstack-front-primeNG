import { Component } from '@angular/core';
import { Productos } from '../../productos';
import { ServicesService } from 'src/app/apiservice/services.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css']
})
export class ListarComponent {
  productos:Productos[];
  data:any = [];
  first = 0;
  rows = 10;
  constructor(private serviceAPI:ServicesService, private enrutador:Router){}
  ngOnInit(){
    this.listarProductos();
  }

  //metodo para listar

  public listarProductos(){
    this.serviceAPI.listarProductos().subscribe(
      (datos)=>{
        this.productos = datos;
        console.log(datos);
      }
    )
  }

  //eliminar
eliminarProducto(id_producto:number){
  this.serviceAPI.eliminarproducto(id_producto).subscribe(()=>{
    //recargarpagina
    console.log("Eliminado")
  },(error)=>{console.log("Error al eliminar")})
}

  //modificar
  editarProducto(id_producto:number){
    this.enrutador.navigate(['productos-editar', id_producto])
  }
  next() {
    this.first = this.first + this.rows;
}

prev() {
    this.first = this.first - this.rows;
}

reset() {
    this.first = 0;
}

pageChange(event: { first: number; rows: number; }) {
  this.first = event.first;
  this.rows = event.rows;
}

isLastPage(): boolean {
    return this.productos ? this.first === this.productos.length - this.rows : true;
}

isFirstPage(): boolean {
    return this.productos ? this.first === 0 : true;
}


  
}
