package com.appback.backapp.model;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class ProductoDTO {
    private String nombreproducto;
    private Double precioproducto;
    private String detalleproducto;
    private Double ivaproducto;
    private MultipartFile archivo;
}
