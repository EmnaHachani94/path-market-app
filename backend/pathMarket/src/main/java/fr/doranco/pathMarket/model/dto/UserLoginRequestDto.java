package fr.doranco.pathMarket.model.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;
@Data
public class UserLoginRequestDto {
    @NotBlank
        private String adresseEmail;
    @NotBlank
        private String motDePasse;
    }

