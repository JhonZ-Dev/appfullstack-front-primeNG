package com.appback.backapp.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;
import java.util.Set;

@Entity
@Table(name = "tbl_ventas")
@Data
public class VentasModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_venta;
    private LocalDate fechaventa;

    //relacion de muchos a uno con usuario
    @ManyToOne
    @JoinColumn(name = "id_usuario")
    private UsuariosModel id_usuario;

    //relacion de muchos a muchos con productos
    @ManyToMany
    @JoinTable(name = "tb_ventas_productos", joinColumns = @JoinColumn(name = "id_venta"),
    inverseJoinColumns = @JoinColumn(name = "id_producto"))
    private Set<Producto> productos;

    //relacion con factura
    @OneToOne(mappedBy = "venta", cascade = CascadeType.ALL)
    private FacturaModel factura;

}
