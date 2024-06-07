package com.appback.backapp.repositorio;

import com.appback.backapp.model.UsuariosModel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UsuarioRepositorio extends JpaRepository<UsuariosModel, Long> {
}
