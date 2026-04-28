package fr.doranco.pathMarket.model.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public class LigneListeCreateRequestDto {
    @NotNull
    private Long produitId;

    @Min(1)
    private int quantite;

    public Long getProduitId() {
        return produitId;
    }

    public void setProduitId(Long produitId) {
        this.produitId = produitId;
    }

    public int getQuantite() {
        return quantite;
    }

    public void setQuantite(int quantite) {
        this.quantite = quantite;
    }
}
