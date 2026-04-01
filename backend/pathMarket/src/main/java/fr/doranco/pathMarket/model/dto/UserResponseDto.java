package fr.doranco.pathMarket.model.dto;

import lombok.Data;

@Data
public class UserResponseDto {
    private Long id;
    private String pseudo;
    private String adresseEmail;
    private String dateDeNaissance;
}
