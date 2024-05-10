package com.appback.backapp.model;

import lombok.Data;

@Data
public class RespuestaPersonalizada {
    private boolean exitoso;
    private String mensaje;

    public RespuestaPersonalizada(boolean exitoso, String mensaje) {
        this.exitoso = exitoso;
        this.mensaje = mensaje;
    }
}
