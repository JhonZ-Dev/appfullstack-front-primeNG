package com.appback.backapp.repositorio;

import com.appback.backapp.model.Producto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ProductoRepositorio extends JpaRepository<Producto, Long> {
    @Query(value = "CALL ObtenerTotalProductosPorDia()", nativeQuery = true)
    List<Object[]> obtenerTotalProductosPorDia();
}
