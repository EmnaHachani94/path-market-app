package fr.doranco.pathMarket.model.dto;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class MagasinDto {
    private Long id;
    private String nom;
    private String adresse;

    public MagasinDto() {}

    public MagasinDto(Long id, String nom, String adresse) {
        this.id = id;
        this.nom = nom;
        this.adresse = adresse;
    }
}
