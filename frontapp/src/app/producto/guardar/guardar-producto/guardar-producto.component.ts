import { Component } from '@angular/core';
import { Productos } from '../../productos';
import { ServicesService } from 'src/app/apiservice/services.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-guardar-producto',
  templateUrl: './guardar-producto.component.html',
  styleUrls: ['./guardar-producto.component.css']
})
export class GuardarProductoComponent {
  producto:Productos = new Productos();
  imagenPreview: string | ArrayBuffer | null = null; // Inicializa la propiedad imagenPreview como nula

  constructor(private serviceAPI:ServicesService, private enrutador:Router){}


 
  irListaUsuarios() {
    this.enrutador.navigate(["/productos-lista"])
  }

  onSubmit(productForm: NgForm, fileInput: any) {
    const productoFormData = new FormData();
    productoFormData.append('file', fileInput.files[0]);
    productoFormData.append('producto', JSON.stringify(productForm.value));
    console.log('Datos del formulario y archivo adjunto:', productoFormData);
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
  

// Función para manejar el cambio en el input de tipo archivo
onFileChange(event: any) {
  const reader = new FileReader();

  if (event.target.files && event.target.files.length) {
    const file = event.target.files[0];

    reader.onload = () => {
      this.imagenPreview = reader.result; // Asigna la URL de datos a la propiedad imagenPreview
    };

    reader.readAsDataURL(file); // Lee el archivo como una URL de datos
  } else {
    this.imagenPreview = null; // Si no se selecciona ningún archivo, establece la vista previa como nula
  }
}



}
