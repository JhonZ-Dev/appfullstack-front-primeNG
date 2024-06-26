package com.appback.backapp.model;

import lombok.Data;

import java.time.LocalDate;
import java.util.Date;

@Data
public class ProductoConImagen {
    private String nombreproducto;
    private Double precioproducto;
    private String detalleproducto;
    private Double ivaproducto;
    private Double preciototal;
    private LocalDate fechaactualizacion;
    private LocalDate fechacreacion;
    private String urlImagen;
    private String sistema;
    private String ubicacion;

    public ProductoConImagen(Producto producto) {
        this.nombreproducto = producto.getNombreproducto();
        this.precioproducto = producto.getPrecioproducto();
        this.detalleproducto = producto.getDetalleproducto();
        this.ivaproducto = producto.getIvaproducto();
        this.preciototal = producto.getPreciototal();
        this.fechaactualizacion = producto.getFechaactualizacion();
        this.fechacreacion = producto.getFechacreacion();
        this.urlImagen = producto.getUrlImagen();
        this.sistema = producto.getSistema();
        this.ubicacion = producto.getUbicacion();
    }
}
