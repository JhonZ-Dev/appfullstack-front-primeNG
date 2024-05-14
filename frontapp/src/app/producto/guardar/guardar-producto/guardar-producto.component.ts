import { Component } from '@angular/core';
import { Productos } from '../../productos';
import { ServicesService } from 'src/app/apiservice/services.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { SelectItem } from 'primeng/api';

@Component({
  selector: 'app-guardar-producto',
  templateUrl: './guardar-producto.component.html',
  styleUrls: ['./guardar-producto.component.css']
})
export class GuardarProductoComponent {
  producto:Productos = new Productos();
  imagenPreview: string | ArrayBuffer;
  opciones: SelectItem[];

  constructor(private serviceAPI:ServicesService, private enrutador:Router){}


  ngOnInit(){
    this.opciones = [
      { label: 'Opción 1', value: 'opcion1' },
      { label: 'Opción 2', value: 'opcion2' },
      { label: 'Opción 3', value: 'opcion3' }
    ];
  }
  irListaUsuarios() {
    this.enrutador.navigate(["/productos-lista"])
  }

  onSubmit(productForm: NgForm, fileInput: any) {
    const productoFormData = new FormData();
    productoFormData.append('file', fileInput.files[0]);
    productoFormData.append('producto', JSON.stringify(productForm.value));
    this.serviceAPI.agregarProductoConImagen2(productoFormData).subscribe(
      (response) => {
        console.log('Producto guardado correctamente:', response);
        // Aquí puedes agregar lógica adicional después de guardar el producto
      },
      (error) => {
        console.error('Error al guardar el producto:', error);
        // Aquí puedes manejar errores de forma adecuada
      }
    );
  }
  


}
