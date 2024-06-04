package com.appback.backapp.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "tbl_usuarios")
@Data
public class UsuariosModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idusuario;
    private String nombre;
    private String apellido;
    private String email;
    private String password;
}
