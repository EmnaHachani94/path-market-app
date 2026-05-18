package fr.doranco.pathMarket.model.dto;


import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProduitDto {
    private Long id;
    private String nomProduit;
    private Long rayonId;
    private String rayonNom;
    private Integer ordreVisite;

    public ProduitDto() {
    }
    public ProduitDto(Long id, String nomProduit, Long rayonId, String rayonNom, Integer ordreVisite) {
        this.id = id;
        this.nomProduit = nomProduit;
        this.rayonId = rayonId;
        this.rayonNom = rayonNom;
        this.ordreVisite = ordreVisite;
    }
}
