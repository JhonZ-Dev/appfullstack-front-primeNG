package com.appback.backapp.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

import java.io.File;
import java.util.Date;


@Entity
@Table(name = "tb_productos")
@Data

public class Producto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_producto;

    private String nombreproducto;
    private Double precioproducto;
    private String detalleproducto;
    private Double ivaproducto;
    private Double preciototal;
    private Date fechaactualizacion;
    private Date fechacreacion;
    private String imagen;




}
