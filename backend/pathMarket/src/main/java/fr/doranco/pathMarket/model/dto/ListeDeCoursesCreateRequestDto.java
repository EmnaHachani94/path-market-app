package fr.doranco.pathMarket.model.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class ListeDeCoursesCreateRequestDto {
    @NotBlank
    private String nomListe;

    @NotNull
    private Long magasinId;

    @NotNull
    private Long utilisateurId;

    public String getNomListe() {
        return nomListe;
    }

    public void setNomListe(String nomListe) {
        this.nomListe = nomListe;
    }

    public Long getMagasinId() {
        return magasinId;
    }

    public void setMagasinId(Long magasinId) {
        this.magasinId = magasinId;
    }

    public Long getUtilisateurId() {
        return utilisateurId;
    }

    public void setUtilisateurId(Long utilisateurId) {
        this.utilisateurId = utilisateurId;
    }
}
