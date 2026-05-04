package fr.doranco.pathMarket.model.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
@Data
public class UserLoginRequestDto {
    @NotBlank
    @Email(message = "L'adresse email doit être valide")
        private String adresseEmail;
    @NotBlank
        private String motDePasse;
    }

