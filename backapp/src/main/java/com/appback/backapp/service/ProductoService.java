package com.appback.backapp.service;

import com.appback.backapp.model.Producto;
import com.appback.backapp.model.RespuestaPersonalizada;
import com.appback.backapp.repositorio.ProductoRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Repository
public class ProductoService {
    @Autowired
    private ProductoRepositorio repositorio;


    //metodo para crear
/*
    public Producto guardar(Producto producto) throws IOException {
        // Validaciones de datos del producto
        if (producto.getNombreproducto() == null || producto.getNombreproducto().isEmpty()) {
            throw new IllegalArgumentException("El nombre del producto no puede estar vacío.");
        }
        if (producto.getPrecioproducto() == null || producto.getPrecioproducto() <= 0) {
            throw new IllegalArgumentException("El precio del producto debe ser positivo.");
        }
        if (producto.getDetalleproducto() != null && producto.getDetalleproducto().isEmpty()) {
            throw new IllegalArgumentException("El detalle del producto no puede estar vacío.");
        }

        // Calcular precio total con IVA
        double precioProductoConIVA = producto.getPrecioproducto() * (1 + producto.getIvaproducto());
        producto.setPreciototal(precioProductoConIVA);

        // Guardar el producto en la base de datos
        return repositorio.save(producto);
    }
*/

    public Producto guardar(Producto producto) {
        return repositorio.save(producto);
    }

    //listar
    public List<Producto> productoList(){
        return repositorio.findAll();
    }

    //listarUnoSolo
    public Optional<Producto> listarOptional(Long id_producto){
        return repositorio.findById(id_producto);
    }

    //metodo para editar
    public Producto editar(Producto producto, Long id_producto) {
        try {
            Optional<Producto> productoOptional = repositorio.findById(id_producto);
            if (productoOptional.isPresent()) {
                Producto producto1 = productoOptional.get();
                producto1.setNombreproducto(producto.getNombreproducto());
                producto1.setDetalleproducto(producto.getDetalleproducto());
                producto1.setPrecioproducto(producto.getPrecioproducto());
                if (!Objects.equals(producto1.getIvaproducto(), producto.getIvaproducto())) {
                    producto1.setIvaproducto(producto.getIvaproducto());
                    double precioProductoConIVA = producto.getPrecioproducto() * (1 + producto.getIvaproducto());
                    producto1.setPreciototal(precioProductoConIVA);
                }
                return repositorio.save(producto1);
            } else {
                throw new Exception("El producto no se encontró en el repositorio.");
            }
        } catch (Exception e) {
            // Manejar la excepción de acuerdo a tus necesidades.
            e.printStackTrace();
            return null;
        }
    }
    public RespuestaPersonalizada eliminar(Long id_producto) {
        try {
            repositorio.deleteById(id_producto);
            return new RespuestaPersonalizada(true, "Producto eliminado correctamente.");
        } catch (Exception e) {
            e.printStackTrace();
            return new RespuestaPersonalizada(false, "Se produjo un error al intentar eliminar el producto.");
        }
    }

    //subir imagen:
}
