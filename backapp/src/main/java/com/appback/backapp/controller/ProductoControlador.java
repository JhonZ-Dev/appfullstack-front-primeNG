package com.appback.backapp.controller;

import com.appback.backapp.model.Producto;
import com.appback.backapp.model.RespuestaPersonalizada;
import com.appback.backapp.service.ProductoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/producto")
@CrossOrigin(origins = "*")
public class ProductoControlador {

    @Autowired
    private ProductoService productoService;

    //guardar
    @PostMapping("/guardar")
    public Producto insertar(@RequestBody Producto producto) throws IOException {
        return productoService.guardar(producto);
    }

    @Value("${app.imagenes.directorio}")
    private String directorioImagen;

    @PostMapping(value = "/guardarconimaggen", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public Producto insertarConImagen(@ModelAttribute Producto producto, @RequestParam("imagen") MultipartFile imagen) throws IOException {
        if (!imagen.isEmpty()) {
            try {
                byte[] bytesImg = imagen.getBytes();
                Path rutaCompleta = Paths.get(directorioImagen, imagen.getOriginalFilename());
                Files.write(rutaCompleta, bytesImg);
                producto.setImagen(imagen.getOriginalFilename());
            } catch (IOException e) {
                e.printStackTrace();
                throw new RuntimeException("No se pudo guardar la imagen", e);
            }
        }
        // Guardar el producto en la base de datos
        return productoService.guardar(producto);
    }




    @PutMapping("/editar/{id_producto}")
    public Producto edit(@RequestBody Producto producto, @PathVariable Long id_producto){
        return productoService.editar(producto,id_producto);
    }
    @GetMapping("listar")
    public List<Producto> listarproductos(){
        return productoService.productoList();
    }
    @DeleteMapping("/eliminar/{id_producto}")
    public RespuestaPersonalizada delete(@PathVariable Long id_producto){
        return productoService.eliminar(id_producto);
    }
    @GetMapping("/obtener/{id_producto}")
    public Optional<Producto> traerProducto(@PathVariable Long id_producto){
        return productoService.listarOptional(id_producto);
    }
}
