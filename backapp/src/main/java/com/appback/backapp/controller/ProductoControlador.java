package com.appback.backapp.controller;

import com.appback.backapp.model.Producto;
import com.appback.backapp.model.ProductoDTO;
import com.appback.backapp.model.RespuestaPersonalizada;
import com.appback.backapp.service.ProductoService;
import com.appback.backapp.service.StorageService;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletRequest;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("api/producto")
@CrossOrigin(origins = "*")
@AllArgsConstructor
public class ProductoControlador {
    private final StorageService storageService;
    private final HttpServletRequest request;
    @Autowired
    private ProductoService productoService;

    //guardar
    @PostMapping("/guardar")
    public Producto insertar(@RequestParam("file") MultipartFile multipartFile, @RequestBody Producto producto, HttpServletRequest request) throws IOException {
        String path = storageService.store(multipartFile);
        String host = ServletUriComponentsBuilder.fromCurrentContextPath().build().toUriString();
        String url = ServletUriComponentsBuilder
                .fromHttpUrl(host)
                .path("/media/")
                .path(path)
                .toUriString();

        producto.setUrlImagen(url); // Establece la URL de la imagen en el objeto Producto

        return productoService.guardar(producto);
    }
    @PostMapping("/guardar-con-imagen")
    public Producto insertarconimagen(@RequestParam("file") MultipartFile multipartFile,
                                      @RequestParam("producto") String productoJson) throws IOException {
        // Convertir el JSON del producto a un objeto Producto
        ObjectMapper objectMapper = new ObjectMapper();
        Producto producto = objectMapper.readValue(productoJson, Producto.class);

        // Guardar la imagen y obtener su URL
        String path = storageService.store(multipartFile);
        String host = ServletUriComponentsBuilder.fromCurrentContextPath().build().toUriString();
        String url = ServletUriComponentsBuilder
                .fromHttpUrl(host)
                .path("/media/")
                .path(path)
                .toUriString();

        // Establecer la URL de la imagen en el objeto Producto
        producto.setUrlImagen(url);

        // Guardar el producto en la base de datos
        return productoService.guardar(producto);
    }



   /* @PostMapping(value = "/guardarconimaggen", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
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
    }*/




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
/*

    @PostMapping("uploads")
    public Map<String, String> cargarImagen(@RequestParam("file") MultipartFile multipartFile, HttpServletRequest request){
        String path = storageService.store(multipartFile);
        String host = ServletUriComponentsBuilder.fromCurrentContextPath().build().toUriString();
        String url = ServletUriComponentsBuilder
                .fromHttpUrl(host)
                .path("/media/")
                .path(path)
                .toUriString();
        //crear un nuevo producto y establecer la URL
        Producto producto = new Producto();
        producto.setUrlImagen(url);
        return productoService.guardar(producto);

    }
*/

    @PostMapping("uploads")
    public Producto cargarImagen(@RequestParam("file") MultipartFile multipartFile, HttpServletRequest request){
        String path = storageService.store(multipartFile);
        String host = ServletUriComponentsBuilder.fromCurrentContextPath().build().toUriString();
        String url = ServletUriComponentsBuilder
                .fromHttpUrl(host)
                .path("/media/")
                .path(path)
                .toUriString();

        // Crear un nuevo producto y establecer la URL de la imagen
        Producto producto = new Producto();
        producto.setUrlImagen(url);

        // Llenar los demás campos del producto si es necesario

        // Guardar el producto en la base de datos
        return productoService.guardar(producto);
    }

    @GetMapping("{filename:.+}")
    public ResponseEntity<Resource> obtenerImagen(@PathVariable String filename) throws IOException{
        Resource file = storageService.load(filename);
        String contentType = Files.probeContentType(file.getFile().toPath());
        return ResponseEntity.ok().header(HttpHeaders.CONTENT_TYPE, contentType)
                .body(file);
    }
}
