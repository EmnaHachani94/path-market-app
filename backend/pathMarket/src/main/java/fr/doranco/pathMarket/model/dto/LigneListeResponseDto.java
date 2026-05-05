package fr.doranco.pathMarket.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class LigneListeResponseDto {
    private Long idLigne;
    private Long produitId;
    private String nomProduit;
    private int quantite;
    private Boolean statut;
    private Long rayonId;
    private String nomRayon;

}
