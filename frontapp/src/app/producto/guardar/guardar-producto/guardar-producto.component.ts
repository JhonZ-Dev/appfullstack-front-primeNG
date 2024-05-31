import { Component, OnInit } from '@angular/core';
import { Productos } from '../../productos';
import { ServicesService } from 'src/app/apiservice/services.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-guardar-producto',
  templateUrl: './guardar-producto.component.html',
  styleUrls: ['./guardar-producto.component.css'],
  providers: [MessageService]
})
export class GuardarProductoComponent implements OnInit {
  producto:Productos = new Productos();
  imagenPreview: string | ArrayBuffer | null = null; // Inicializa la propiedad imagenPreview como nula

  constructor(private serviceAPI:ServicesService, private enrutador:Router, private messageService: MessageService){}


 ngOnInit(){
     this.obtenerUbicacion();
 }
  irListaUsuarios() {
    this.enrutador.navigate(["/productos-lista"])
  }

  async onSubmit(productForm: NgForm, fileInput: any) {
    await this.obtenerUbicacion(); // Espera a que la información de ubicación se obtenga
    const productoFormData = new FormData();
    productoFormData.append('file', fileInput.files[0]);
    productoFormData.append('producto', JSON.stringify(productForm.value));
    console.log('Datos del formulario y archivo adjunto:', productoFormData);
    console.log('Sistema:', this.producto.sistema); // Imprime el sistema en la consola
    console.log('Ubicación:', this.producto.ubicacion); // Imprime la ubicación en la consola

    this.serviceAPI.agregarProductoConImagen(productoFormData).subscribe(
      (response) => {
        console.log('Producto guardado correctamente:', response);
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Guardado Correctamente' });
        // Aquí puedes agregar lógica adicional después de guardar el producto
        setTimeout(() => {
          this.irLista();
        }, 3000);
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


async obtenerUbicacion() {
  const API_ENDPOINT_IP = "http://api.ipify.org/?format=json";
  const API_ENDPOINT_UA = "https://api.apicagent.com/?ua=" + navigator.userAgent;

  try {
    // Obtener IP
    const responseIp = await fetch(API_ENDPOINT_IP);
    const datosIp = await responseIp.json();
    const ip = datosIp.ip;

    // Obtener Ubicación según IP
    const API_ENDPOINT_LOCATION = "http://ip-api.com/json/" + ip;
    const responseLocation = await fetch(API_ENDPOINT_LOCATION);
    const datosUbicacion = await responseLocation.json();
    this.producto.ubicacion = `${datosUbicacion.country} - ${datosUbicacion.city} - ${ip}`;
    console.log('Ubicación obtenida:', this.producto.ubicacion);

    // Obtener Sistema Operativo
    const responseUa = await fetch(API_ENDPOINT_UA);
    const datosNavegador = await responseUa.json();
    this.producto.sistema = `${datosNavegador.os.name} ${datosNavegador.os.version}, ${datosNavegador.client.name}`;
    console.log('Sistema obtenido:', this.producto.sistema);

  } catch (error) {
    console.error('Error al obtener la ubicación y sistema:', error);
  }
}

irLista(){
  this.enrutador.navigate(["/productos-lista"])
}


}
