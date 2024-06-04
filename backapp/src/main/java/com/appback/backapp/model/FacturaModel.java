package com.appback.backapp.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;

@Entity
@Table(name = "tb_facturas")
@Data
public class FacturaModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_factura;

    private LocalDate fechaFactura;
    private Double total;

    // Relación con Venta
    @OneToOne
    @JoinColumn(name = "venta_id")
    private VentasModel venta;
}
