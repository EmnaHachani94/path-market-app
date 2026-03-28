package fr.doranco.pathMarket.model.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Past;
import jakarta.validation.constraints.Size;
import lombok.*;
import org.springframework.security.core.parameters.P;

import java.time.LocalDate;

@Data
@Builder
@AllArgsConstructor @NoArgsConstructor
public class UserRegisterRequestDto {


    @NotBlank
    @Size(min = 3, max = 32)
    private String pseudo;
    @NotBlank
    @Size(min = 5, max = 50, message = "L'adresse email doit comporter entre 5 et 50 caractères")
    private String adresseEmail;

    @NotBlank
    @Size(min = 16, max = 20, message = "Le mot de passe doit comporter entre 16 et 20 caractères")
    private String motDePasse;

    @Past
    private LocalDate dateDeNaissance;

    public void setActive(boolean active) {
    }
    //private boolean active;

}
